let up = document.getElementById("up");
let down = document.getElementById("down");
let area = document.getElementById("area");
let checkBox = document.getElementById("chB");

document.getElementById("btnmain").addEventListener("click", function() {
    checkBox.style.opacity = "1"
})
const radioList = document.querySelectorAll('.check-card.radio')
const cardList = document.querySelectorAll('.check-card.card')

for (let i = 0; i < radioList.length; i++) {
    radioList[i].addEventListener('change', function() {
        if (i == 0) {
            document.getElementById("calendar").style.opacity = "0"
            alert(i)
        } else if (i == 1) {
            document.getElementById("calendar").style.opacity = "1"
            alert(i)
        } else if (i == 2) {
            alert(i)
            //omogucava interval dana
        } else if (i == 3) {
            alert(i)
            //omogucava interval dana
        }
    })
}


document.getElementById("btnmain").addEventListener("click", function() {
    checkBox.style.opacity = "1";
})

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





let calendar = document.querySelector('.calendar')

const month_names = ['Januar', 'Februar', 'Mart', 'April', 'Maj', 'Jun', 'Jul', 'Avgust', 'Septembar', 'Oktobar', 'Novembar', 'Decembar']

isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 === 0)
}

getFebDays = (year) => {
    return isLeapYear(year) ? 29 : 28
}

generateCalendar = (month, year) => {

    let calendar_days = calendar.querySelector('.calendar-days')
    let calendar_header_year = calendar.querySelector('#year')

    let days_of_month = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    calendar_days.innerHTML = ''

    let currDate = new Date()
    if (month == null) month = currDate.getMonth()
    if (!year) year = currDate.getFullYear()

    let curr_month = `${month_names[month]}`
    month_picker.innerHTML = curr_month
    calendar_header_year.innerHTML = year

    // get first day of month
    //DANI U MESECU
    let first_day = new Date(year, month, 0)

    for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
        let day = document.createElement('div')
        if (i >= first_day.getDay()) {
            day.classList.add('calendar-day-hover')
            day.innerHTML = i - first_day.getDay() + 1
            day.innerHTML += `<span></span>
                            <span></span>
                            <span></span>
                            <span></span>`
            if (i - first_day.getDay() + 1 === currDate.getDate() && year === currDate.getFullYear() && month === currDate.getMonth()) {
                day.classList.add('curr-date')
            }
        }
        calendar_days.appendChild(day)
    }
}

let month_list = calendar.querySelector('.month-list')

month_names.forEach((e, index) => {
    let month = document.createElement('div')
    month.innerHTML = `<div data-month="${index}">${e}</div>`
    month.querySelector('div').onclick = () => {
        month_list.classList.remove('show')
        curr_month.value = index
        generateCalendar(index, curr_year.value)
    }
    month_list.appendChild(month)
})

let month_picker = calendar.querySelector('#month-picker')

month_picker.onclick = () => {
    month_list.classList.add('show')
}

let currDate = new Date()

let curr_month = { value: currDate.getMonth() }
let curr_year = { value: currDate.getFullYear() }

generateCalendar(curr_month.value, curr_year.value)

document.querySelector('#prev-year').onclick = () => {
    --curr_year.value
    generateCalendar(curr_month.value, curr_year.value)
}

document.querySelector('#next-year').onclick = () => {
    ++curr_year.value
    generateCalendar(curr_month.value, curr_year.value)
}