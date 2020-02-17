//  TODO: Remove Request Completely
// const request = require('request');
// const userAgents = require('./userAgents');

const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const fs = require('fs')


const headLines = []

//  TODO: Remove Request Completely
// const options = {
//     url: 'https://news.google.com/topics/CAAqJggKIiBDQkFTRWdvSUwyMHZNRFp0Y1RjU0FtVnVHZ0pKVGlnQVAB/sections/CAQiT0NCQVNOUW9JTDIwdk1EWnRjVGNTQldWdUxVZENHZ0pKVGlJUUNBUWFEQW9LTDIwdk1EUTJOak15Y3lvTUVnb3ZiUzh3TkRZMk16SnpLQUEqLggAKioICiIkQ0JBU0ZRb0lMMjB2TURadGNUY1NCV1Z1TFVkQ0dnSkpUaWdBUAFQAQ?hl=en-IN&gl=IN&ceid=IN%3Aen',
//     headers: {
//         'User-Agent': userAgents[Math.floor(Math.random() * userAgents.length)]
//     }
// };

// function callback(error, response, body) {
//     if (!error && response.statusCode == 200) {
//         extractInfo(body)
//     }
// }

function extractInfo(info, type) {
    const $ = cheerio.load(info);
    const rawHeadlines = Array.from($('[jscontroller="d0DtYd"]'));
    const rawSection = Array.from($(rawHeadlines).find('.xrnccd.F6Welf.R7GTQ'));
    const rawRelated = Array.from($(rawHeadlines).find('.SbNwzf'));

    if (type === 'top_news' || type === 'topics') {
        extractHeadlines(rawHeadlines);
        extractRelated(rawRelated);
        
        //Print How Many Data 
        console.log(rawHeadlines.length)
        console.log(rawRelated.length)
    } else if (type === 'section') {
        extractHeadlines(rawSection);
        extractRelated(rawRelated)
        
        //Print How Many Data 
        console.log(rawSection.length)
        console.log(rawRelated.length)
    }
        }

async function crawlNews() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://news.google.com/?hl=en-IN&gl=IN&ceid=IN:en');
    const info = await page.content();
    if(info){
        extractInfo(info, 'section')
    }

    await browser.close();

    //  TODO: Remove Request Completely

        // try {
        //     request(options, callback);

        // } catch (error) {
        //     console.log(error);
        // }
}

function extractHeadlines(rawHeadlines){
    const $ = cheerio.load(rawHeadlines);
    rawHeadlines.forEach((el, index)=>{
            const id = index;
            const newsTitle = $(el)
                .find('.ipQwMb.ekueJc.RD0gLb').first().text();
            const newsDesc = $(el).find('.xBbh9').first().text();
            const thumbNail = $(el).find('img').attr('src');
            const source = $(el).find('.wEwyrc.AVN2gc.uQIVzc').first().text();
            const sourceRef = $(el).find('article')
                .attr('jslog').match(/\bhttps?:\/\/\S+/gi)[0];
            const timeStamp = Date.parse($(el).find('time').attr('datetime'));

            headLines.push({
                id,
                newsTitle,
                newsDesc,
                thumbNail,
                source,
                sourceRef,
                timeStamp
            })
    })
}
function extractRelated(rawRelated){
    const $ = cheerio.load(rawRelated);
    let related = []
    rawRelated.forEach((el, indexmain)=>{
            relatedChilds = Array.from($(el).children());
            relatedChilds.forEach((el, index)=>{
                const id = index;
                const relTitle= $(el).find('h4').text();
                const relDesc= $(el).find('.xBbh9').text();
                const relSource = $(el).find('.SVJrMe')
                    .find('.wEwyrc.AVN2gc.uQIVzc').text();
                const relSourceRef= $(el).find('.ipQwMb.ekueJc.RD0gLb')
                    .find('a').attr('href')
                    .replace('./','https://news.google.com/');
                const relTimeStamp= Date.parse($(el)
                    .find('time').attr('datetime'));
                related.push({
                    id,
                    relTitle,
                    relDesc,
                    relSource,
                    relSourceRef,
                    relTimeStamp
                })
            })
        headLines[indexmain].relatedNews = related
        related=[]
    })
    writefile('headlines',headLines)
}
function writefile(file_name, data) {
    fs.writeFileSync(`${'./news_data/' + file_name + '.json'}`,
      JSON.stringify(data, null, 2));
}

crawlNews();