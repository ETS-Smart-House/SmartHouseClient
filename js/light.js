const buttons = document.querySelectorAll("button");
const sliders = document.querySelectorAll(".slider");
const checkboxes = document.querySelectorAll('.holder input[type=checkbox]')

window.addEventListener('load', async() => {
    const { data, status } = await axios.get('http://localhost:3000/light')
    Object.keys(data).forEach(id => {
        const value = data[id]
        setValue(id, value, false)
    })
});

/**
 * Selects the active room for lighting control
 *
 * @param {Event} e
 */
function selectActiveRoom(e) {

    // Proveri da li postoji active holder, ako postoji, skloni ga
    let activeButton = document.querySelector('button.active')
    if (activeButton) {
        activeButton.classList.remove('active')
    }
    e.target.classList.add('active')

    // Proveri da li postoji active holder, ako postoji, skloni ga
    let activeHolder = document.querySelector('.holder.active')
    if (activeHolder) {
        activeHolder.classList.remove('active')
    }

    // Nadji sobu
    const room = e.target.getAttribute('id');

    // Daj joj klasu 'active' kako bi postala display: block
    activeHolder = document.querySelector(`.holder#${room}`)
    activeHolder.classList.add('active')
}

buttons.forEach(btn => btn.addEventListener('click', selectActiveRoom))

/**
 * Change the slider value
 *
 * @param {Event} e
 */
function changeSliderValue(e) {
    const value = e.target.value;

    const container = e.target.parentElement.parentElement;

    const containerId = container.getAttribute('id')

    setValue(containerId, value)
}

sliders.forEach(slide => slide.addEventListener('input', changeSliderValue))

function toggleSliderValue(e) {
    const value = e.currentTarget.checked;
    const container = e.target.parentElement.parentElement;
    const containerId = container.getAttribute('id')


    switch (value) {
        case true:
            setValue(containerId, 50)
            break;
        default:
            setValue(containerId, 0)
            break;
    }
}

checkboxes.forEach(checkbox => checkbox.addEventListener('click', toggleSliderValue))

function setValue(id, value, sendToApi = true) {
    const slider = document.querySelector(`.holder#${id} input[type=range]`)
    const checkbox = document.querySelector(`.holder#${id} input[type=checkbox]`)
    const output = document.querySelector(`.holder#${id} .tooltip .output`)
    const sidebarBtn = document.querySelector(`button#${id}`)
    const bulb = document.querySelector(`.holder#${id} .bulp`)

    // Slider
    slider.value = value;

    // Sidebar button
    // Checkbox
    if (value > 1) {
        sidebarBtn.classList.add('light-on')
        checkbox.checked = true
    } else {
        sidebarBtn.classList.remove('light-on')
        checkbox.checked = false
    }

    // Label
    output.innerHTML = value

    const opacity = value > 20 ? value / 100 : 0.2

    // bulb.style.opacity = opacity
    bulb.style.filter = `drop-shadow(0 0 ${value / 2}px #fff)`

    // Poziv za bazu

    axios.post('http://localhost:3000/light', {
        room: id,
        value: value
    })
}