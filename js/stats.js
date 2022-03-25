const navLinks = document.querySelectorAll('nav li a')

async function selectActiveNav(e) {
    const activeLink = document.querySelector('nav li a.active')
    if (activeLink) activeLink.classList.remove('active')
    e.target.classList.add('active')
    const location = e.target.getAttribute('data-location')

    const activePanel = document.querySelector('section.holder.active')
    if (activePanel) activePanel.classList.remove('active')

    const panel = document.querySelector(`section.holder#${location}`)
    panel.classList.add('active')

    await changeLocation(location)
}

navLinks.forEach(navLink => navLink.addEventListener('click', selectActiveNav))

/************************************
 Load content from API
 */

const allMeasurementsUrl = 'http://localhost:8012/measurements'
const currentMeasurementUrl = 'http://localhost:8012/latest-measurement'

window.addEventListener("DOMContentLoaded", async () => {
    let location = 'indoor'
    await changeLocation(location)
})

async function changeLocation(location) {

    let response = await axios.get(allMeasurementsUrl, {
        params: {location}
    })

    let historyPanel = document.querySelector(`section.holder#${location} .split.istorija`)
    let nowPanel = document.querySelector(`section.holder#${location} .split.trenutno`)

    historyPanel.innerHTML = ''
    nowPanel.innerHTML = ''

    const today = moment().format('YYYY-MM-DD')

    for (const item of response.data) {
        if (item['date'] !== today) {
            let itemMarkup = ''
            let line = generateSeparatorLine()
            switch (location) {
                case 'indoor':
                    itemMarkup = generateIndoorHistoryItem(item['date'], item['temperature'], item['humidity'])
                    break
                case 'outdoor':
                    itemMarkup = generateOutdoorHistoryItem(item['date'], item['temperature'], item['humidity'])
                    break
            }
            historyPanel.append(itemMarkup)
            historyPanel.append(line)
        }
    }

    response = await axios.get(currentMeasurementUrl, {
        params: {location}
    })

    const {temperature, humidity} = response.data

    let itemMarkup = ''
    switch (location) {
        case 'indoor':
            itemMarkup = generateIndoorNowItem(temperature, humidity)
            break
        case 'outdoor':
            itemMarkup = generateOutdoorNowItem(temperature, humidity)
            break
    }

    nowPanel.append(itemMarkup)
}

function generateIndoorHistoryItem(date, temperature, humidity) {
    date = moment(date).format('DD/MM/yyyy')
    const itemMarkup = document.createElement('div')
    itemMarkup.classList.add('h-box')
    itemMarkup.innerHTML = `
                <div class="h-text">
                    <div class="txt-section">
                        <p class="h-temperature">${temperature}°</p>
                        <div class="h-humidity">
                            <p class="h-humidity">vlažnost</p>
                            <p>${humidity}%</p>
                        </div>
                    </div>
                    <div class="hsx-line"></div>
                    <div class="h-date">
                        <p>${date}</p>
                    </div>
                </div>`


    return itemMarkup
}

function generateSeparatorLine() {
    const line = document.createElement('div')
    line.classList.add('hx-line')

    return line
}

function generateIndoorNowItem(temperature, humidity) {
    const itemMarkup = document.createElement('div')
    itemMarkup.classList.add('box')

    itemMarkup.innerHTML = `
            <div class="text">
                <div class="temperature">
                    <p id="temp-indoor">${temperature}°</p>
                </div>
                <div class="humidity">
                    <p>vlažnost</p>
                    <p id="humidity-indoor">${humidity}%</p>
                </div>
            </div>`

    return itemMarkup
}

function generateOutdoorHistoryItem(date, temperature, humidity) {

    let imgUri = ''
    if (temperature > 15) {
        imgUri = '../assets/stats/sun.png'
    } else {
        imgUri = '../assets/stats/cloud.png'
    }

    const itemMarkup = document.createElement('div')
    itemMarkup.classList.add('h-box')
    itemMarkup.innerHTML = `
        <img src="${imgUri}" alt="">
        <div class="h-text">
            <div class="txt-section">
                <p class="h-temperature">${temperature}°</p>
                <div class="h-humidity">
                    <p class="h-humidity">vlažnost</p>
                    <p>${humidity}%</p>
                </div>
            </div>
            <div class="hsx-line"></div>
            <div class="h-date">
                <p>${date}</p>
            </div>
        </div>`

    return itemMarkup
}

function generateOutdoorNowItem(temperature, humidity) {
    const itemMarkup = document.createElement('div')
    itemMarkup.classList.add('box')

    itemMarkup.innerHTML = `
        <img id="img" src="../assets/stats/sun.png" alt="Loading img...">
            <div class="v-line" id="vline"></div>
            <div class="text">
                <div class="temperature">
                    <p id="temp">${temperature}°</p>
                </div>
                <div class="humidity">
                    <p>vlažnost</p>
                    <p id="humidity">${humidity}%</p>
                </div>

        </div>`

    return itemMarkup
}