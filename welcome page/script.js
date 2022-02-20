let body = document.getElementsByTagName("body")[0];
let section = document.getElementsByTagName("section")[0];
let button = document.getElementsByTagName("button")[0];
function mouseOver(){
    body.style.transition= "all 0.2s";
    body.style.backgroundColor = "#2176ff";
}
function mouseLeave(){
    body.style.backgroundColor = "#469ef7";
}