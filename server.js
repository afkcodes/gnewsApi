const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser')
const crawl = require('./app')


var requestTime = function (req, res, next) {
    if(req.path === '/news'){
        crawl('in', 'en');
        next()
    }
  }
  
  
  app.get('/', function (req, res) {
    res.send('hello')
})
    
  app.use(requestTime)
  app.get('/news', async function (req, res) {
    let news = await require('./news_data/Headlines.json')
    // let news = JSON.parse('./news_data/Headlines.json');
    res.json(news);
  })
  
app.listen(port, () => console.log(`Example app listening on port ${port}!`));