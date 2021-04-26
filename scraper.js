const puppeteer = require('puppeteer');

global.globalString = "This can be accessed anywhere!";
console.log(globalString);

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`https://webapps.siouxfalls.org/policecalllog`);
  
    const data = await page.evaluate(() => {
      const tds = Array.from(document.querySelectorAll('table tr td'))
      return tds.map(td => td.innerText)
    });
  
    var i;
    var counter = 0;
    for (i = 0; i < data.length; i++) {
    counter ++;
    if(counter<7){
        console.log(data[i])
    }
    else{
        counter = 1;
        console.log("newline" + data[i])
    }
    }
    await browser.close();
  })();


