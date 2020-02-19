//  TODO: Remove Request Completely
// const request = require('request');
// const userAgents = require('./userAgents');

const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const fs = require('fs')

const { baseUrl, topics, sections, lang, country } = require('./constants')


// console.log(`https://news.google.com/?hl=${lang.en}-${country.us}&gl=${country.us}&ceid=${country.us}:${lang.en}`)

const headLines = []

//  TODO: Remove Request Completely
// const options = {
//     url: 'https://news.google.com/topics/CAAqIQgKIhtDQkFTRGdvSUwyMHZNR3QwTlRFU0FtVnVLQUFQAQ/sections/CAQiR0NCQVNMd29JTDIwdk1HdDBOVEVTQldWdUxVZENJZzhJQkJvTENna3ZiUzh3TVcxM01uZ3FDeElKTDIwdk1ERnRkeko0S0FBKikIAColCAoiH0NCQVNFUW9JTDIwdk1HdDBOVEVTQldWdUxVZENLQUFQAVAB?hl=en-IN&gl=IN&ceid=IN%3Aen',
//     headers: {
//         'User-Agent': userAgents[Math.floor(Math.random() * userAgents.length)]
//     }
// };

// function callback(error, response, body) {
//     if (!error && response.statusCode == 200) {
//         extractInfo(body, 'section')
//     }else{
//         console.log('eror')
//     }
// }

function extractInfo(info, type) {
    const $ = cheerio.load(info);
    const rawHeadlines = Array.from($('[jscontroller="d0DtYd"]'));
    const rawSection = Array.from($('.xrnccd'));
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

async function crawlNews(country_code, language) {
    console.log('BOOOM12345 ', lang[language]);
    console.log('BOOOM ', lang[language]);
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`https://news.google.com/?hl=${lang[language]}-${country[country_code]}&gl=${country[language]}&ceid=${country[country_code]}:${lang[language]}`);
    const info = await page.content();
    if(info){
        extractInfo(info, 'top_news');
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
    writefile('testdynamic',headLines)
}
function writefile(file_name, data) {
    fs.writeFileSync(`${'./news_data/' + file_name + '.json'}`,
      JSON.stringify(data, null, 2));
}

crawlNews('in','hi'); 