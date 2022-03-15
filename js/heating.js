const heatingForm = document.querySelector('form#heating-form')
const floorInput = document.querySelector('#floors')
const modeInputs = document.querySelectorAll('input[name=mode]')
const calendarContainer = document.querySelector('div.calendar')
const contentAutoContainer = document.querySelector('section.content.auto')
const contentManualContainer = document.querySelector('section.content.manual')
const addAnotherBtn = document.querySelector('#add-another')

addEventListener("DOMContentLoaded", () => {
    // API poziv za temperaturu
    console.log('loadewd')
})

const datePicker = new Datepicker(calendarContainer, {
    todayBtn: true,
    language: 'sr-latn',
    autohide: false
});


function changeDate(e) {
    const selectedDate = new Date(e.detail.date);
    console.log(selectedDate)
}
calendarContainer.addEventListener('changeDate', changeDate)

function changeFloor(e) {
    console.log(e.target.value)
}
floorInput.addEventListener('change', changeFloor)

function changeMode(e) {
    const selectedMode = e.target.value
    switch (selectedMode) {
        case 'manual':
            calendarContainer.classList.remove('hidden')

            contentAutoContainer.classList.add('hidden')
            contentManualContainer.classList.remove('hidden')
            break;
        default:
            calendarContainer.classList.add('hidden')

            contentAutoContainer.classList.remove('hidden')
            contentManualContainer.classList.add('hidden')
            break
    }
}
modeInputs.forEach((modeInput) => modeInput.addEventListener('change', changeMode))

addAnotherBtn.addEventListener('click', addAnotherRow)

function addAnotherRow() {
    const fieldset = document.createElement('fieldset')
    fieldset.innerHTML = `
        <input type="time" name="from" id="from">
        <input type="time" name="to" id="to">
        <input type="number" name="temp" id="temp" value="22">
    `
    contentManualContainer.querySelector('.values').appendChild(fieldset)
}