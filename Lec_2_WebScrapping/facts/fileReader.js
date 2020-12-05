//File System
let fs = require("fs");

let fileContent = fs.readFileSync("./f1.txt");
console.log( fileContent );
console.log( fileContent + "");     //Stringify ho jayega abb ye

let html = fs.readFileSync("./index.html","utf-8"); // stringify ki jagha plane text me bhi le sakte hai
console.log(html);
//console.log(html+ "");
