let up = document.getElementById("img1");
let down = document.getElementById("img2");
let pa = document.getElementById("area");
let first = document.getElementById("first");
let second = document.getElementById("second");
let box = document.getElementById("dropdown");
let button = document.getElementById("dugme");



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
var clicks = 0;
button.addEventListener('click', function() {
    clicks += 1;
    if (clicks % 2 == 0) {
        up.style.visibility = "hidden"
        down.style.visibility = "visible";
        button.style.borderRadius = "20px"

    } else {
        up.style.visibility = "visible"
        down.style.visibility = "hidden";
        button.style.borderRadius = "20px 20px 0px 0px"
        second.style.borderRadius = "0px 0px 20px 20px"
    }
});


first.addEventListener("click", function() {
    pa.innerHTML = "First";

});
second.addEventListener("click", function() {
    pa.innerHTML = "Second"
})