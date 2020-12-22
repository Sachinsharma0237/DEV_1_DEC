//Node Features ==> It won't work in web, but it'll work fine standalone
let $ = require("jquery");

$(document).ready(function(){
    let db;
    let lsc;
    
    $(".cell").on("click", function(){
        //console.log(this);
        let rowId = Number($(this).attr("rowId"));
        let colId = Number($(this).attr("colId"));
        let address = String.fromCharCode(65+colId) + rowId + "";
        //console.log(address);
        $("#address").val(address);    //class = formula
    });
    $(".cell").on("blur", function(){
        lsc = this;
        let rowId = $(this).attr("rowId");
        let colId = $(this).attr("colId");
        let value = $(this).text();
        let cellObject = db[rowId][colId];
        if(value != cellObject.value){  
             cellObject.value = value;
        }
        //console.log(db);
    });
    $("#formula").on("blur", function(){
        let formula = $(this).val();
        // console.log(formula);
        if(formula){
            let value = solveFormula(formula);
            //lsc => <div> B1
            let rowId = $(lsc).attr("rowId");
            let colId = $(lsc).attr("colId");
            let cellObject = db[rowId][colId];
            if(cellObject.value != value){
                cellObject.value = value;
                $(lsc).text(value);
            }
        }
    });
    function solveFormula(formula){
        let fComps = formula.split(" ");
        for(let i = 0; i < fComps.length; i++){
            let comp = fComps[i];
            let firstCharacter = comp[0];
            if(firstCharacter >= "A" && firstCharacter <= "Z" || firstCharacter >= "a" && firstCharacter <= "z" ){

                let { rowId, colId } = getRowIdColIdFromAddress(comp); 
                let cellObject = db[rowId][colId];
                let value = cellObject.value;
                formula = formula.replace(comp, value);
            }
        }
        //formula => (10 + 20) // infix Evaluation
        let value = eval(formula);
        return value;
    }

    //Utility Function
    function getRowIdColIdFromAddress(address){
        let colId = address.charCodeAt(0) <= 90 ? address.charCodeAt(0) - 65 : address.charCodeAt(0) - 97;
        let rowId = Number(address.substring(1)) - 1;
        return {
            rowId : rowId,
            colId : colId
        }
    }
    function initDB(){
        db = [];
        for(let i = 0; i < 100; i++){
            let row = [];
            for(let j = 0; j < 26; j++){
                let rowId = i + 1;
                let colId = String.fromCharCode(65+j);
                let name = colId + rowId + "";
                let cellObject = {
                    name : name,
                    value : ""
                }
                row.push(cellObject);
            }
            db.push(row);
        }
        //console.log(db);     
    }
    initDB();
})