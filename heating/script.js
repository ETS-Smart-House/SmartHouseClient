let up = document.getElementById("up");
let down = document.getElementById("down");
let area = document.getElementById("area");
let checkBox = document.getElementById("chB");

function promena() {
    area.innerHTML = "Prvi";
    //     if (area.innerHTML == "Prvi" || area.innerHTML == "Drugi") {
    //         checkBox.style.opacity = "1";
    //     }
    // }

    function promena1() {
        area.innerHTML = "Drugi";
        // if (area.innerHTML == "Prvi" || area.innerHTML == "Drugi") {
        //     checkBox.style.opacity = "1";
        // }
    }


    document.addEventListener("click", e => {
        const isDropdownButton = e.target.matches("[data-dropdown-button]");
        if (!isDropdownButton && e.target.closest("[data-dropdown]") != null) {
            up.style.visibility = "hidden";
            down.style.visibility = "visible";
            checkBox.style.opacity = "0"

            return
        }

        let currentDropdown
        if (isDropdownButton) {
            currentDropdown = e.target.closest("[data-dropdown]");
            currentDropdown.classList.toggle("active");
        } else {
            up.style.visibility = "hidden";
            down.style.visibility = "visible";
            checkBox.style.opacity = "0"
        }

        document.querySelectorAll("[data-dropdown].active").forEach(dropdown => {
            if (dropdown === currentDropdown) {
                dropdown.classList.remove("active");
                up.style.visibility = "visible";
                down.style.visibility = "hidden";
                checkBox.style.opacity = "1"


            }
        })
    })