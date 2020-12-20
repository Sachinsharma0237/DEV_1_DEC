const id = "@you_know_shady";
const pw = "Sachin@1234";
const puppeteer = require("puppeteer");

(async function(){
        try{
            let browser = await puppeteer.launch({
                headless : false,
                defaultViewport : null,
                args: ["--start-maximized"]
            });
            let pages = await browser.pages();
            let tab = pages[0];
            await tab.goto("https://www.instagram.com/accounts/login/?source=auth_switcher");
            await tab.waitForSelector('input[aria-label="Phone number, username, or email"]', {visible:true});
            await tab.type('input[aria-label="Phone number, username, or email"]', id);
            await tab.type('input[aria-label="Password"]', pw);
            await tab.waitForSelector(".sqdOP.L3NKy.y3zKF", {visible:true});
            await tab.click(".sqdOP.L3NKy.y3zKF");
            await Promise.all( [tab.waitForNavigation() ,tab.click(".sqdOP.L3NKy.y3zKF")]);
            await tab.click(".sqdOP.L3NKy.y3zKF");
            await tab.waitForSelector(".aOOlW.bIiDR", {visible:true});
            await tab.click(".aOOlW.bIiDR");
             
            await tab.waitForSelector(".sqdOP.yWX7d._8A5w5.ZIAjV", {visible:true});
            await tab.click(".sqdOP.yWX7d._8A5w5.ZIAjV");
            
            await tab.waitForSelector("._9AhH0", {visible:true});
            await tab.click("._9AhH0");
            await tab.waitForSelector("._8-yf5", {visible:true});
            await tab.click("._8-yf5");

             
            
        }
        catch(error){
            console.log(error);
        }
})();
