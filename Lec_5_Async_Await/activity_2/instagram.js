const id = "@you_know_shady";
const pw = "Sachin@1234";
const anyId = "@eminem";
const puppeteer = require("puppeteer");
let noOfPost = process.argv[2];   //for input
(async function(){
        try{
            let browser = await puppeteer.launch({
                headless : false,
                defaultViewport : null,
                args: ["--start-maximized"]
            });
            let pages = await browser.pages();
            let tab = pages[0];
            await tab.goto("https://www.instagram.com/accounts/login/?source=auth_switcher", {waitUntil:"networkidle2"});
            await tab.type('input[aria-label="Phone number, username, or email"]', id,{delay:10});
            await tab.type('input[aria-label="Password"]', pw, {delay:10});
            await tab.waitForSelector(".sqdOP.L3NKy.y3zKF", {visible:true});
            await tab.click(".sqdOP.L3NKy.y3zKF");
            await Promise.all( [tab.waitForNavigation() ,tab.click(".sqdOP.L3NKy.y3zKF")]);
            await tab.click(".sqdOP.L3NKy.y3zKF");
            await tab.waitForSelector(".aOOlW.bIiDR", {visible:true});
            await tab.click(".aOOlW.bIiDR");
            await tab.waitForSelector(".pbgfb.Di7vw", {visible:true});
            await tab.click(".pbgfb.Di7vw" );
            await tab.waitForSelector(".XTCLo.x3qfX", {visible:true});
            await tab.type(".XTCLo.x3qfX",anyId );
            await tab.waitForSelector(".z556c", {visible:true});
            await tab.click(".z556c");
            await tab.waitForSelector(".v1Nh3.kIKUG._bz0w", {visible:true});
            await tab.waitForSelector("._9AhH0", {visible:true});
            await tab.click("._9AhH0");
            //Now Liking
            let i = 0;
            do{
                await tab.waitForSelector(".fr66n button", {visible:true});
                await tab.click(".fr66n button");
                await tab.click(" ._65Bje.coreSpriteRightPaginationArrow");
                i++;
            }while(i < noOfPost)
        }
        catch(error){
            console.log(error);
        }
})();

