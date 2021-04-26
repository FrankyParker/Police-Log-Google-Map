
const path = require("path")
const express = require("express")
const app = express()
const puppeteer = require('puppeteer');

app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(express.static("public"));
app.set("views", "views")

app.listen(3000, ()=>{
    console.log("The server is now running on port 3000")
})

app.set("view engine", "hbs")

global.globalString = "This can be accessed anywhere!";
console.log(globalString);


var policeLogs = [];
(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`https://webapps.siouxfalls.org/policecalllog`);
  
    const data = await page.evaluate(() => {
      const tds = Array.from(document.querySelectorAll('table tr td'))
      return tds.map(td => td.innerText)
    });
  
    var i;
    for (i = 0; i < data.length; i++) {
    policeLogs.push(data[i]);
    }
    await browser.close();
  })();

  
app.get("/", (req, res)=>{
    res.render("index",{items:policeLogs})
})