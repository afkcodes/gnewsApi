const cheerio = require('cheerio');
const request = require('request');
const userAgents = require('./userAgents');

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
    const b = Array.from($('.SbNwzf') )
    console.log(b.length)
    b.forEach((el, index)=>{
        if (index == 0){
            // console.log($($(el)).hasClass('.ipQwMb.ekueJc.RD0gLb').text());
            // console.log('Title :::::', $(el).find('.ipQwMb.ekueJc.RD0gLb').first().text());
            console.log('Title :::::', $(el).find('.ipQwMb.ekueJc.RD0gLb').text());

            // console.log('Image :::::', $(el).find('img').attr('src'))
            // console.log('sourceLink :::::', $(el).find('article').attr('jslog').match(/\bhttps?:\/\/\S+/gi)[0])
            // console.log('Source :::::', $(el).find('.wEwyrc.AVN2gc.uQIVzc').first().text())
            // console.log('Time :::::', $(el).find('time').attr('datetime'))
        }
    })

    // console.log(a.length)
    
}

function crawlNews() {
    try {
        request(options, callback);

    } catch (error) {
        console.log(error);
    }
}

crawlNews();