let pencil = document.querySelector("#pencil");
let eraser = document.querySelector("#eraser");
let eraserOptions = document.querySelector("#eraser-options");
let pencilOptions = document.querySelector("#pencil-options");
let black = document.querySelector(".black");
let red = document.querySelector(".red");
let green = document.querySelector(".green");
let blue = document.querySelector(".blue");
let yellow = document.querySelector(".yellow");
let colors = document.querySelector(".pencil-colors div");
let pencilSize = document.querySelector("#pencil-size");
let eraserSize = document.querySelector("#eraser-size");

/*
let activeTool = "pencil";

pencil.addEventListener("click", function(){
    if(activeTool == "pencil"){
        
    }else{
        activeTool = "pencil";
        pencil.classList.add("active-tool");
        eraser.classList.remove("active-tool");
    }
})
eraser.addEventListener("click", function(){
    if(activeTool == "eraser"){

    }else{
        activeTool = "eraser";
        eraser.classList.add("active-tool");
        pencil.classList.remove("active-tool");
    }
})    
*/
/*
for(let i = 0; i < colors.length; i++){
    colors[i].addEventListener("click", function(){
        if(colors[i].classList.contains("black")){
            ctx.strokeStyle = "black";
        }else if(colors[i].classList.contains("red")){
            ctx.strokeStyle = "red";
        }else if(colors[i].classList.contains("green")){
            ctx.strokeStyle = "green";
        }else if(colors[i].classList.contains("blue")){
            ctx.strokeStyle = "blue";
        }else {
            ctx.strokeStyle = "yellow";
        }
    })
}
*/
lastPencilSize = 1;
lastEraserSize = 1;
pencilSize.addEventListener("change", function(){
    lastPencilSize = pencilSize.value;
    ctx.lineWidth = lastPencilSize;
});
eraserSize.addEventListener("change", function(){
    lastEraserSize = eraserSize.value;
    ctx.lineWidth = lastEraserSize;
});

black.addEventListener("click", function(){
    ctx.strokeStyle = "black";
});
red.addEventListener("click", function(){
    ctx.strokeStyle = "red";
});
green.addEventListener("click", function(){
    ctx.strokeStyle = "green";
});
blue.addEventListener("click", function(){
    ctx.strokeStyle = "blue";
});
yellow.addEventListener("click", function(){
    ctx.strokeStyle = "yellow";
});

pencil.addEventListener("click", function(){
    if(pencil.classList.contains("active-tool")){
            //open options of pencil
        if(pencilOptions.classList.contains("hide")){
            pencilOptions.classList.remove("hide");
        }else{
            pencilOptions.classList.add("hide");
        }

    }else{
        ctx.strokeStyle = "black";
        ctx.lineWidth = lastPencilSize;
        if(!eraserOptions.classList.contains("hide")){
            eraserOptions.classList.add("hide");
        }
        eraser.classList.remove("active-tool");
        pencil.classList.add("active-tool");
    }
})
eraser.addEventListener("click", function(){
    if(eraser.classList.contains("active-tool")){
        //open options of eraser
        if(eraserOptions.classList.contains("hide")){
            eraserOptions.classList.remove("hide");
        }else{
            eraserOptions.classList.add("hide");
        }
    }else{
        ctx.strokeStyle = "white";
        ctx.lineWidth = lastEraserSize;
        if(!pencilOptions.classList.contains("hide")){
            pencilOptions.classList.add("hide");
        }
        pencil.classList.remove("active-tool");
        eraser.classList.add("active-tool");
    }
})