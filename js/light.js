let buttons = document.querySelectorAll("button");
let sliders = document.querySelectorAll(".slider");

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
    const room = e.target.dataset.room;

    // Daj joj klasu 'active' kako bi postala display: block
    activeHolder = document.querySelector(`.holder#${room}`)
    activeHolder.classList.add('active')
}
buttons.forEach(btn => btn.addEventListener('click', selectActiveRoom))

/**
 * Changes the slider label 
 * 
 * @param {Event} e 
 */
function changeSliderLabel(e) {
    const value = e.target.value;

    const label = e.target.nextElementSibling.querySelector('.output')
    label.innerHTML = value
}
sliders.forEach(slide => slide.addEventListener('input', changeSliderLabel))