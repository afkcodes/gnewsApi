const cheerio = require('cheerio');
const request = require('request');
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
    const a = Array.from($('[jscontroller="d0DtYd"]'));
    const b = Array.from($(a).find('.SbNwzf') )
    b.forEach((el, index)=>{
        if (index == 0){
            // console.log($($(el)).hasClass('.ipQwMb.ekueJc.RD0gLb').text());
            // console.log('Title :::::', $(el).find('.ipQwMb.ekueJc.RD0gLb').first().text());
            c = Array.from($(el).children());
            c.forEach((ele, index)=>{
            //     console.log($(ele).find('h4').text());
            //     console.log($(ele).find('.xBbh9').text());
                console.log($(ele).find('.ipQwMb.ekueJc.RD0gLb').find('a').attr('href').replace('./','https://news.google.com/'));


            })
            // console.log('\n ************************************************ \n');

            // console.log('Image :::::', $(el).find('img').attr('src'))
            // console.log('sourceLink :::::', $(el).find('article').attr('jslog').match(/\bhttps?:\/\/\S+/gi)[0])
            // console.log('Source :::::', $(el).find('.wEwyrc.AVN2gc.uQIVzc').first().text())
            // console.log('Time :::::', $(el).find('time').attr('datetime'))
        }
    })
    // extractHeadlines(a);

    console.log(a.length)
    console.log(b.length)

    // console.log(c.length)

    
}

function crawlNews() {
    try {
        request(options, callback);

    } catch (error) {
        console.log(error);
    }
}
function extractHeadlines(rawData){
    const $ = cheerio.load(rawData);
    rawData.forEach((el, index)=>{
            const id = index;
            const newsTitle = $(el).find('.ipQwMb.ekueJc.RD0gLb').first().text();
            const newsDesc = $(el).find('.xBbh9').first().text();
            const thumbNail = $(el).find('img').attr('src');
            const source = $(el).find('.wEwyrc.AVN2gc.uQIVzc').first().text();
            const sourceRef = $(el).find('article').attr('jslog').match(/\bhttps?:\/\/\S+/gi)[0];
            const timeStamp = $(el).find('time').attr('datetime');

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
    console.log(headLines)
    
}

crawlNews();