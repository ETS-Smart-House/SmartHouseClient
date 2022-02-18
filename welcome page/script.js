let section = document.getElementsByTagName("section")[0];
let button = document.getElementsByTagName("button")[0];
function mouseOver(){
    section.style.backgroundColor = "#0d1f2d" ;
    button.style.border = "5px solid #2176ff" ;
    section.style.transition= "all 1s";
}
function mouseLeave(){
    section.style.backgroundColor = "#2176ff";
}