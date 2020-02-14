import { link } from "fs"

{
    entertainment: "CAAqJggKIiBDQkFTRWdvSUwyMHZNREpxYW5RU0FtVnVHZ0pIUWlnQVAB"
    tech : "CAAqJggKIiBDQkFTRWdvSUwyMHZNRGRqTVhZU0FtVnVHZ0pIUWlnQVAB"
    business: "CAAqJggKIiBDQkFTRWdvSUwyMHZNRGx6TVdZU0FtVnVHZ0pIUWlnQVAB"
    world : "CAAqJggKIiBDQkFTRWdvSUwyMHZNRGx1YlY4U0FtVnVHZ0pIUWlnQVAB"
    sports : "CAAqJggKIiBDQkFTRWdvSUwyMHZNRFp1ZEdvU0FtVnVHZ0pIUWlnQVAB"
    science: "CAAqJggKIiBDQkFTRWdvSUwyMHZNRFp0Y1RjU0FtVnVHZ0pIUWlnQVAB"
    health : "CAAqIQgKIhtDQkFTRGdvSUwyMHZNR3QwTlRFU0FtVnVLQUFQAQ"
    country : "CAAqIQgKIhtDQkFTRGdvSUwyMHZNRGR6YzJNU0FtVnVLQUFQAQ"
}

https://news.google.com/?hl=en-GB&gl=GB&ceid=GB%3Aen
https://news.google.com/topics/CAAqJggKIiBDQkFTRWdvSUwyMHZNRGx1YlY4U0FtVnVHZ0pIUWlnQVAB?hl=en-GB&gl=GB&ceid=GB%3Aen

https://news.google.com/search?q=apple&hl=en-IN&gl=IN&ceid=IN:en


a = document.querySelector('.xrnccd.F6Welf.R7GTQ')
link : a.querySelector('article').getAttribute('jslog').match(/\bhttps?:\/\/\S+/gi);
image : a.querySelector('img').getAttribute('src')
title : a.querySelector('.ipQwMb.ekueJc.RD0gLb').textContent
source : a.querySelector('.wEwyrc.AVN2gc.uQIVzc').textContent
time : a.querySelector('time').getAttribute('datetime')

// Related 
b = a.querySelector('.SbNwzf').querySelector('article')
title : b.querySelector('.ipQwMb.ekueJc.RD0gLb').innerText
link : b.querySelector('.ipQwMb.ekueJc.RD0gLb').querySelector('a').getAttribute('href').replace('./','https://news.google.com/')
source  : b.querySelector('.SVJrMe').querySelector('.wEwyrc.AVN2gc.uQIVzc').textContent
time : b.querySelector('time').getAttribute('datetime')
