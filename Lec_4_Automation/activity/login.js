const request = require("request");

const id = "vowojo8383@sdysofa.com";
const pw = "Sachin@12345";

const puppeteer = require("puppeteer");
let gTab;
let gIdx;
let gCode;
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
    let waitAndClickPromise = waitAndClick(".ui-btn.ui-btn-normal.ui-btn-large.ui-btn-primary.ui-btn-link.ui-btn-styled");
    return waitAndClickPromise;
})
.then(function(){
    let waitAndClickPromise = waitAndClick(".ui-btn.ui-btn-normal.playlist-card-btn.ui-btn-primary.ui-btn-link.ui-btn-styled");
    return waitAndClickPromise;
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
    console.log(allLinks);
    let completeLink = allLinks.map(function(link){
        return  `https://www.hackerrank.com${link}`;
    })
    console.log(completeLink);
    let oneQuesPendingPromise = solveQuestion(completeLink[0]);
        return oneQuesPendingPromise;
})
.then(function(){
    console.log("One Question Solved Successfully");
})
.catch(function(error){
    reject(error);
})

function waitAndClick(selector){
    return new Promise(function(resolve, reject){
        let waitPromise = gTab.waitForSelector(selector, {visible : true});
        waitPromise.then(function(){
            let clickPromise = gTab.click(selector);
            return clickPromise;
        })
        .then(function(){
            resolve();
        })
        .catch(function(error){
            reject(error);
        })
    });
}
function getCode(){
    return new Promise( function(resolve, reject){
        let waitPromise = gTab.waitForSelector(".hackdown-content h3", {visible: true});
        waitPromise.then(function(){
            let allCodeNamesElementsPromise = gTab.$$(".hackdown-content h3");
            return allCodeNamesElementsPromise; 
        })
        .then(function(allCodeNamesElement){
            //[ <h3>C++</h3>, <h3>Java</h3>, <h3>Pythonh3>]
            // allCodeNamePromise = [ Promise{pending}, Promise{pending}, Promise{pending}]
            let allCodeNamePromise = [];
            for(let i = 0; i < allCodeNamesElement.length; i++){
                let namePromise = gTab.evaluate( function(elem){ return elem.textContent;  }, allCodeNamesElement[i] );
                allCodeNamePromise.push(namePromise);
            }
            let promiseOfAllCodesNames = Promise.all(allCodeNamePromise);
            return promiseOfAllCodesNames;
        })
        .then(function(codeNames){
            //[C++, Java, Python];
            let idx;
            for(let i = 0; i < codeNames.length; i++){
                if(codeNames[i] == "C++"){
                    idx = i;
                    break;
                }
            }
            gIdx = idx;
            let allCodesElementPromise = gTab.$$(".hackdown-content .highlight");
            return allCodesElementPromise;
        })
        .then(function(allCodeElement){
            //[ <div></div>, <div></div>, <div></div> ]
            let codeDiv = allCodeElement[gIdx];
            let codePromise = gTab.evaluate( function(elem){ return elem.textContent;  }, codeDiv)
            return codePromise;

        })
        .then(function(code){
            console.log(code);
            gCode = code;
            resolve();
        })
        .catch(function(){
            reject(error);
        })
    });
}
function solveQuestion(quesLink){
    return new Promise(function(resolve, reject){
         let quesGotoPromise = gTab.goto(quesLink);
         quesGotoPromise.then(function(){
            let waitAndClickPromise = waitAndClick('div[data-attr2="Editorial"]');
            return waitAndClickPromise;
        })
        /*
        .then(function(){
            let waitAndClickPromise = waitAndClick(".ui-btn.ui-btn-normal.ui-btn-primary.ui-btn-styled ");
            return waitAndClickPromise;
        }) */
        .then(function(){
            let codePromise = getCode();
            return codePromise;
        })
        .then(function(){
            console.log("Got Code");
        })
        .catch(function(error){
           // console.log(error);
            reject(error);
        })
    });
}