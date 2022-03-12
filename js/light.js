//Dnevna soba
var sliderDs = document.getElementById("rangeDs");
var outputDs = document.getElementById("areaDs");
var cheboxDs = document.getElementById("chbDs");
outputDs.innerHTML = sliderDs.value;
sliderDs.oninput = function() {
    outputDs.innerHTML = this.value;
    if (sliderDs.value >= 1) {
        cheboxDs.checked = true
    } else {
        cheboxDs.checked = false
    }

}
cheboxDs.oninput = function() {
    if (cheboxDs.checked == true) {
        sliderDs.value = 50
        outputDs.innerHTML = "50";
    } else {
        sliderDs.value = 0
        outputDs.innerHTML = "0";
    }
}





// Kupatilo
var sliderKp = document.getElementById("rangeKp");
var outputKp = document.getElementById("areaKp");
var cheboxKp = document.getElementById("chbKp");
outputKp.innerHTML = sliderKp.value;
sliderKp.oninput = function() {
    outputKp.innerHTML = this.value;
    if (sliderKp.value >= 1) {
        cheboxKp.checked = true
    } else {
        cheboxKp.checked = false
    }

}
cheboxKp.oninput = function() {
    if (cheboxKp.checked == true) {
        sliderKp.value = 50
        outputKp.innerHTML = "50";
    } else {
        sliderKp.value = 0
        outputKp.innerHTML = "0";
    }
}

// Stepeniste
var sliderSt = document.getElementById("rangeSt");
var outputSt = document.getElementById("areaSt");
var cheboxSt = document.getElementById("chbSt");
outputSt.innerHTML = sliderSt.value;
sliderSt.oninput = function() {
    outputSt.innerHTML = this.value;
    if (sliderSt.value >= 1) {
        cheboxSt.checked = true
    } else {
        cheboxSt.checked = false
    }

}
cheboxSt.oninput = function() {
        if (cheboxSt.checked == true) {
            sliderSt.value = 50
            outputSt.innerHTML = "50";
        } else {
            sliderSt.value = 0
            outputSt.innerHTML = "0";
        }
    }
    // Soba 2
var sliderS1 = document.getElementById("rangeS1");
var outputS1 = document.getElementById("areaS1");
var cheboxS1 = document.getElementById("chbS1");
outputS1.innerHTML = sliderS1.value;
sliderS1.oninput = function() {
    outputS1.innerHTML = this.value;
    if (sliderS1.value >= 1) {
        cheboxS1.checked = true
    } else {
        cheboxS1.checked = false
    }

}
cheboxS1.oninput = function() {
        if (cheboxS1.checked == true) {
            sliderS1.value = 50
            outputS1.innerHTML = "50";
        } else {
            sliderS1.value = 0
            outputS1.innerHTML = "0";
        }
    }
    // Soba 2
var sliderS2 = document.getElementById("rangeS2");
var outputS2 = document.getElementById("areaS2");
var cheboxS2 = document.getElementById("chbS2");
outputS2.innerHTML = sliderS2.value;
sliderS2.oninput = function() {
    outputS2.innerHTML = this.value;
    if (sliderS2.value >= 1) {
        cheboxS2.checked = true
    } else {
        cheboxS2.checked = false
    }

}
cheboxS2.oninput = function() {
    if (cheboxS2.checked == true) {
        sliderS2.value = 50
        outputS2.innerHTML = "50";
    } else {
        sliderS2.value = 0
        outputS2.innerHTML = "0";
    }
}