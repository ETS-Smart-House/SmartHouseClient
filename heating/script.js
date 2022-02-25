let up = document.getElementById("img1");
let down = document.getElementById("img2");
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
    window.onclick = function(event) {  
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
};
let button = document.getElementById("dugme");
var clicks = 0;
button.addEventListener('click', function(){
    clicks += 1;
    if(clicks%2 == 0){
        up.style.visibility ="hidden"
        down.style.visibility = "visible";
    }
    else{
        up.style.visibility ="visible"
        down.style.visibility = "hidden";
    }
});
let pa = document.getElementById("area");
let first = document.getElementById("first");
let second = document.getElementById("second");
let box = document.getElementById("dropdown");
first.addEventListener("click" , function(){
    pa.innerHTML = "First";
    dropdown.style.animation = "move 2s linear forwards"

});
second.addEventListener("click" , function(){
    pa.innerHTML = "Second"
})