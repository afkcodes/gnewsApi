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
    const articles = cheerio.load(info);
    const a = articles('.xrnccd.F6Welf.R7GTQ');
    
}


function crawlNews() {
    try {
        request(options, callback);

    } catch (error) {
        console.log(error);
    }
}

crawlNews();