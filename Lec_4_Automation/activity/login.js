const request = require("request");

const id = "vowojo8383@sdysofa.com";
const pw = "Sachin@12345";

const puppeteer = require("puppeteer");
let gTab;
// TO Open A Browser
//by Default true
// ye Launch ki setting hai sarri object daali hai argument me
let browserOpenPromise = puppeteer.launch({headless : false,
                                           defaultViewport : null,
                                           args : ["--start-maximized"]
                                             }); 
//then ka function == Success CallBack
browserOpenPromise.then(function(browser){
    let pagesPromise = browser.pages();
    return pagesPromise;
})
.then(function(pages){
    let tab = pages[0];
    gTab = tab;
    let pageOpenPromise = tab.goto("https://www.hackerrank.com/auth/login");
    return pageOpenPromise;
})
//ye the  pageOpenPromise ka then hai matlab wo success hoga tb hi ye chalega ye usske success se attach hai
.then(function(){
    let idTypePromise = gTab.type("#input-1", id);
    return idTypePromise;
})
.then(function(){
    let pwTypePromise = gTab.type("#input-2", pw);
    return pwTypePromise;
})
.then(function(){
   let loginclickPromise =  gTab.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled");
   return loginclickPromise;
})
//click => navigation => click
.then(function(){
    let waitPromise = gTab.waitForSelector(".ui-btn.ui-btn-normal.ui-btn-large.ui-btn-primary.ui-btn-link.ui-btn-styled", {visible : true});
    return waitPromise;
})
.then(function(){
    let ipKitClickedPromise = gTab.click(".ui-btn.ui-btn-normal.ui-btn-large.ui-btn-primary.ui-btn-link.ui-btn-styled");
    return ipKitClickedPromise;
})
.then(function(){
    let waitPromise = gTab.waitForSelector(".ui-btn.ui-btn-normal.playlist-card-btn.ui-btn-primary.ui-btn-link.ui-btn-styled", {visible : true});
    return waitPromise;
})
.then(function(){
    let seeChalengesClickedPromise = gTab.click(".ui-btn.ui-btn-normal.playlist-card-btn.ui-btn-primary.ui-btn-link.ui-btn-styled", {visible : true});
    return seeChalengesClickedPromise;
})
.then(function(){
    let waitPromise = gTab.waitForSelector(".js-track-click.challenge-list-item", {visible : true});
    return waitPromise;
})
.then(function(){
    let allQuesPromise = gTab.$$(".js-track-click.challenge-list-item");
    return allQuesPromise;
})
.then(function(allQuesElements){
    // [ <a href = "" ></a>, <a href = ""></a>, <ahref = ""></a>, <a></a> }
    let completeLinkPromise = [];
    for(let i = 0; i < allQuesElements.length; i++){
        let linkPromise = gTab.evaluate(function(elem){return elem.getAttribute("href")}, allQuesElements[i]);
        completeLinkPromise.push(linkPromise);
    }
    let pendingPromiseOfAllLinks = Promise.all(completeLinkPromise);
    return pendingPromiseOfAllLinks;
})
.then(function(allLinks){
    let completeLink = allLinks.map(function(link){
        return  `https://www.hackerrank.com${link}`;
    })
    console.log(completeLink);
})
.catch(function(error){
    console.log(error);
})