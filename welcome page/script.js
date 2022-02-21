
let body = document.getElementsByTagName("body")[0];
let section = document.getElementsByTagName("section")[0];
let button = document.getElementsByTagName("button")[0];
let img = document.getElementById("banner");
function mouseOver(){
    body.style.transition= "all 0.7s";
    section.style.transition= "all 0.7s";
    section.style.backgroundColor = "#1a73e8";
    button.style.backgroundColor = "#252839";
}
function mouseLeave(){
    section.style.backgroundColor = "#252839";
    button.style.backgroundColor = "#1a73e8";

}