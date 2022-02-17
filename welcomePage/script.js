let section = document.getElementsByTagName("section")[0];
let button = document.getElementsByTagName("button")[0];
let text = document.getElementsByTagName("p")[2-6];
button.addEventListener('mouseover', () => section.style.backgroundColor = "#000000" ,section.style.transition= "all 1s" )
button.addEventListener('mouseleave', () => section.style.backgroundColor = "#010228")