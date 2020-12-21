//Node Features ==> It won't work in web, but it'll work fine standalone
let $ = require("jquery");

$(document).ready(function(){

    console.log("Document is Loaded!!!");
    $(".cell").on("click", function(){
        console.log(this);
        let rowId = Number($(this).attr("rowId"));
        let colId = Number($(this).attr("colId"));
        // console.log(rowId);
        // console.log(colId);
        let address = String.fromCharCode(65+colId) + rowId + "";
        console.log(address);
        $("#address").val(address);
    });
})