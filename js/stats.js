const buttons = document.querySelectorAll("button");

function selectActiveRoom(e) {
    let activeButton = document.querySelector('button.active')
    if (activeButton) {
        activeButton.classList.remove('active')

    }
    e.target.classList.add('active')

    let activeHolder = document.querySelector('.holder.active')
    if (activeHolder) {
        activeHolder.classList.remove('active')
    }
    const room = e.target.getAttribute('id');

    activeHolder = document.querySelector(`.holder#${room}`)
    activeHolder.classList.add('active')
}
buttons.forEach(btn => btn.addEventListener('click', selectActiveRoom))

function activeButton(e) {
    const button = e.target.getAttribute('id');
    const button1 = document.querySelector('#indoor');
    const button2 = document.querySelector('#outdoor');
    console.log(button);
    if (button == "indoor") {
        button1.style.opacity = "1"
        button2.style.opacity = "0.5"
    } else {
        button1.style.opacity = "0.5"
        button2.style.opacity = "1"
    }
}
buttons.forEach(btn => btn.addEventListener('click', activeButton))