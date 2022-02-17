alert(1);
let section = document.getElementsByTagName("section")[0];
let button = document.getElementsByTagName("button")[0];
function mouseOver(){
    section.style.backgroundColor = "black" ;
    section.style.transition= "all 1s";
}
function mouseLeave(){
    section.style.backgroundColor = "#010258";
}