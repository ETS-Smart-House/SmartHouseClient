let section = document.getElementsByTagName("section")[0];
let button = document.getElementsByTagName("button")[0];
function mouseOver(){
    section.style.backgroundColor = "#F9F9F9" ;
    section.style.transition= "all 1s";
}
function mouseLeave(){
    section.style.backgroundColor = "red";
}