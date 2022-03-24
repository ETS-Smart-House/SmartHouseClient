const navLinks = document.querySelectorAll('nav li a')

function selectActiveNav(e) {
    const activeLink = document.querySelector('nav li a.active')
    if (activeLink) activeLink.classList.remove('active')
    e.target.classList.add('active')
    const location = e.target.getAttribute('data-location')

    const activePanel = document.querySelector('section.holder.active')
    if (activePanel) activePanel.classList.remove('active')

    const panel = document.querySelector(`section.holder#${location}`)
    panel.classList.add('active')
}

navLinks.forEach(navLink => navLink.addEventListener('click', selectActiveNav))

/************************************
 Load content from API
 */

const apiUrl = 'http://localhost:8012/measurements'

window.addEventListener("DOMContentLoaded", async() => {

    const location = 'indoor'

    const response = await axios.get(apiUrl, {
        params: { location }
    })

    const historyPanel = document.querySelector(`section.holder#${location} .split.istorija`)
    const nowPanel = document.querySelector(`section.holder#${location} .split.trenutno`)

    const today = moment().format('YYYY-MM-DD')

    for (const item of response.data) {
        if (item['date'] === today) {
            const { itemMarkup, line } = generateIndoorNowItem(item['temperature'], item['humidity'])
            nowPanel.append(itemMarkup)
        } else {
            const { itemMarkup, line } = generateIndoorHistoryItem(item['date'], item['temperature'], item['humidity'])
            historyPanel.append(itemMarkup)
            historyPanel.append(line)
        }
    }
})

function generateIndoorHistoryItem(date, temperature, humidity) {
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

    const line = document.createElement('div')
    line.classList.add('hx-line')

    return { itemMarkup, line }
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

    const line = document.createElement('div')
    line.classList.add('hx-line')

    return { itemMarkup, line }
}