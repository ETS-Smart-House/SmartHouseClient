let up = document.getElementById("up");
let down = document.getElementById("down");
let area = document.getElementById("area");

function promena() {
    area.innerHTML = "Prvi";
}

function promena1() {
    area.innerHTML = "Drugi";
}


document.addEventListener("click", e => {
    const isDropdownButton = e.target.matches("[data-dropdown-button]");
    if (!isDropdownButton && e.target.closest("[data-dropdown]") != null) {
        up.style.visibility = "hidden";
        down.style.visibility = "visible";
        return
    }

    let currentDropdown
    if (isDropdownButton) {
        currentDropdown = e.target.closest("[data-dropdown]");
        currentDropdown.classList.toggle("active");
    } else {
        up.style.visibility = "hidden";
        down.style.visibility = "visible";
    }

    document.querySelectorAll("[data-dropdown].active").forEach(dropdown => {
        if (dropdown === currentDropdown) {
            dropdown.classList.remove("active");

            up.style.visibility = "visible";
            down.style.visibility = "hidden";
        }
    })
})