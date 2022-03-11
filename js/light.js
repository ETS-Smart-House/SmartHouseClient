var slider = document.getElementById("myRange");
var output = document.getElementById("area");
var img = document.getElementById("img");
var chebox = document.getElementById("chb");
output.innerHTML = slider.value;
slider.oninput = function() {
    output.innerHTML = this.value;
    if (slider.value >= 1) {
        chebox.checked = true
    } else {
        chebox.checked = false
    }

}
chebox.oninput = function() {
    if (chebox.checked == true) {
        slider.value = 1
        output.innerHTML = "1";
    } else {
        slider.value = 0
        output.innerHTML = "0";
    }
}