const cheerio = require('cheerio');
const request = require('request');
const fs = require('fs')
const userAgents = require('./userAgents');

const headLines = []

const options = {
    url: 'https://news.google.com/?hl=en-IN&gl=IN&ceid=IN:en',
    headers: {
        'User-Agent': userAgents[Math.floor(Math.random() * userAgents.length)]
    }
};

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        extractInfo(body)
    }
}

function extractInfo(info) {
    const $ = cheerio.load(info);
    const rawHeadlines = Array.from($('[jscontroller="d0DtYd"]'));
    const rawRelated = Array.from($(rawHeadlines).find('.SbNwzf') )

    extractHeadlines(rawHeadlines);
    extractRelated(rawRelated)

    console.log(rawHeadlines.length)
    console.log(rawRelated.length)
        }

function crawlNews() {
    try {
        request(options, callback);

    } catch (error) {
        console.log(error);
    }
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