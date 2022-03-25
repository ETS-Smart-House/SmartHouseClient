/************************************
 * Date Picker
 */
const calendarContainer = document.querySelector('div.calendar')

const datePicker = new Datepicker(calendarContainer, {
    todayBtn: true, language: 'sr-latn', autohide: false
});

calendarContainer.addEventListener('changeDate', async (e) => {
    const day = moment(e.detail.date).format('YYYY-MM-DD')

    const saveBtn = document.querySelector('.sidebar a.save')
    saveBtn.setAttribute('date', day)

    const response = await getData(day)

    setValuesFromApi(response)
})

/************************************
 Auto temperature
 */

const autoTempStep = 1

function decrement(el) {
    const input = el.nextElementSibling
    const min = input.getAttribute('min')
    const max = input.getAttribute('max')
    const value = parseInt(input.value)
    if (value - autoTempStep >= min && value - autoTempStep <= max) {
        input.value = (value - autoTempStep)
    }
}

function increment(el) {
    const input = el.previousElementSibling
    const min = input.getAttribute('min')
    const max = input.getAttribute('max')
    const value = parseInt(input.value)

    if (value + autoTempStep >= min && value + autoTempStep <= max) {
        input.value = (value + autoTempStep)
    }
}

/************************************
 Temperature Period Rows
 */
function generateRowElementMarkup(timeFrom = undefined, timeTo = undefined, value = 22, showRemoveBtn = true) {
    return `<input type="time" name="from" value="${timeFrom}">
                <input type="time" name="to" value="${timeTo}">
                <div class="number-box">
                    <a href="#" class="num-button decrement" onclick="decrement(this)">-</a>
                    <input type="number" value="${value}" step="1" max="40" min="0" class="auto-temp">
                    <a href="#" class="num-button increment" onclick="increment(this)">+</a>
                </div>
                <a href="#" class="remove ${showRemoveBtn ? '' : 'hidden'}" onclick="removeRow(this)">x</a>`
}

function generateRowElement(timeFrom = null, timeTo = null, value = 22) {
    const row = document.createElement('div')
    row.classList.add('row')
    row.innerHTML = generateRowElementMarkup(timeFrom, timeTo, value)
    return row
}

function addRowEvent(el) {
    const rowsContainer = el.parentElement.querySelector('.rows')

    const row = generateRowElement()
    rowsContainer.append(row)

    const rows = el.parentElement.querySelectorAll('.rows .row')
    if ((rows.length + 1) > 1) {
        rows[0].querySelector('.remove').classList.remove('hidden')
    }
}

function addRow(floorSelector, timeFrom, timeTo, value) {
    const rowsContainer = document.querySelector(`.floor.${floorSelector} .mode.manual .rows`)

    const row = generateRowElement(timeFrom, timeTo, value)
    rowsContainer.append(row)

    const rows = document.querySelectorAll(`.floor.floor-${floorSelector} .mode.manual .rows .row`)
    if ((rows.length + 1) > 1) {
        rows[0].querySelector('.remove').classList.remove('hidden')
    }

}

function removeRow(el) {
    const floorSelector = el.parentElement.parentElement.parentElement.parentElement.classList[1]
    const row = el.parentElement
    let rows = document.querySelectorAll(`.${floorSelector} .rows .row`)
    if (rows.length > 1) row.remove()
    rows = document.querySelectorAll(`.${floorSelector} .rows .row`)
    if (rows.length === 1) rows[0].querySelector('.remove').classList.add('hidden')
}

/************************************
 Switch floors
 */
const firstFloor = document.querySelector('.floors .floor-0')
const secondFloor = document.querySelector('.floors .floor-1')

function switchFloors(e) {
    const value = e.target.value;

    const day = moment().format('YYYY-MM-DD')
    const data = getLocalData(day)
    let floorData
    let mode
    let floorId
    switch (value) {
        case 'first':
            floorId = 0
            firstFloor.classList.remove('hidden')
            firstFloor.classList.add('active')
            secondFloor.classList.add('hidden')
            secondFloor.classList.remove('active')
            floorData = data.find(floor => floor.floor === floorId)
            break;
        case 'second':
            floorId = 1
            firstFloor.classList.add('hidden')
            firstFloor.classList.remove('active')
            secondFloor.classList.remove('hidden')
            secondFloor.classList.add('active')
            floorData = data.find(floor => floor.floor === floorId)
            break;
    }
    const modeSelector = document.querySelector('input[id=mode]')
    mode = modeSelector.getAttribute(`floor-${floorId}-value`) ?? floorData.mode

    switch (mode) {
        case 'auto':
            modeSelector.checked = false;
            break;
        case 'manual':
            modeSelector.checked = true;
            break;
    }
}

document.querySelector('select[name=floors]')
    .addEventListener('change', switchFloors)

/************************************
 Switch modes
 */
function switchModes(e) {
    const value = e.target.checked ? 'manual' : 'auto'
    const floorContainer = document.querySelector('.floor.active')
    const floorId = floorContainer.classList[1]
    const autoContainer = floorContainer.querySelector('.mode.auto')
    const manualContainer = floorContainer.querySelector('.mode.manual')
    e.target.setAttribute(`${floorId}-value`, value)

    switch (value) {
        case 'manual':
            autoContainer.classList.add('hidden')
            autoContainer.classList.remove('active')
            manualContainer.classList.remove('hidden')
            manualContainer.classList.add('active')
            break
        case 'auto':
            autoContainer.classList.remove('hidden')
            autoContainer.classList.add('active')
            manualContainer.classList.add('hidden')
            manualContainer.classList.remove('active')
            break
    }
}

document.querySelector('input#mode')
    .addEventListener('change', switchModes)

/************************************
 Load content from API
 */

const apiUrl = 'http://localhost:8012/temperature'

window.addEventListener("DOMContentLoaded", async () => {
    const day = moment().format('YYYY-MM-DD')

    const saveBtn = document.querySelector('.sidebar a.save')
    saveBtn.setAttribute('date', day)

    const response = await getData()

    setValuesFromApi(response)
})

function removeLocalData(day) {
    localStorage.removeItem(day)
}

function getLocalData(day) {
    const data = localStorage.getItem(day)
    if (!data) return null
    return JSON.parse(data)
}

function setLocalData(day, data) {
    localStorage.setItem(day, JSON.stringify(data))
}

async function getData(day) {
    if (!day) day = moment().format('YYYY-MM-DD')
    try {
        const response = await axios.get(apiUrl, {
            params: {day}
        })

        const data = response.data;

        setLocalData(day, data)

        return data
    } catch (e) {
        return []
    }
}

function setValuesFromApi(floors) {

    const modeSelector = document.querySelector('input[id=mode]')
    modeSelector.checked = false
    modeSelector.removeAttribute('floor-0-value')
    modeSelector.removeAttribute('floor-1-value')

    const floorContainers = document.querySelectorAll('.floors .floor')
    for (const floorContainer of floorContainers) {
        const autoContainer = floorContainer.querySelector('.mode.auto')
        const manualContainer = floorContainer.querySelector('.mode.manual')
        autoContainer.classList.remove('hidden')
        autoContainer.classList.add('active')
        manualContainer.classList.add('hidden')
        manualContainer.classList.remove('active')

        const autoInputValue = autoContainer.querySelector('input[type=number].auto-temp')
        autoInputValue.value = 22

        const rows = manualContainer.querySelectorAll('.rows .row')
        for (const row of rows) {
            row.remove()
        }
    }

    if (!floors.length) return

    for (const floor of floors) {
        const floorId = floor['floor']
        const floorContainer = document.querySelector(`.floors .floor.floor-${floorId}`)
        const autoModeContainer = floorContainer.querySelector('.mode.auto')
        const manualModeContainer = floorContainer.querySelector('.mode.manual')

        switch (floor.mode) {
            case 'auto':
                autoModeContainer.classList.add('active')
                autoModeContainer.classList.remove('hidden')
                manualModeContainer.classList.add('hidden')
                manualModeContainer.classList.remove('active')
                break;
            case 'manual':
                autoModeContainer.classList.add('hidden')
                autoModeContainer.classList.remove('active')
                manualModeContainer.classList.add('active')
                manualModeContainer.classList.remove('hidden')
                break
        }

        const autoModeValue = autoModeContainer.querySelector('input[name=auto-temp]')
        if (floor.value !== undefined) {
            autoModeValue.value = floor.value
        }


        const modeSelector = document.querySelector('input[id=mode]')
        modeSelector.setAttribute(`floor-${floorId}-value`, floor.mode)
        if (floorId === 0) {
            switch (floor.mode) {
                case 'auto':
                    modeSelector.checked = false;
                    break;
                case 'manual':
                    modeSelector.checked = true;
                    break;
            }
        }
        if (floor['periods'].length) {
            for (const period of floor['periods']) {
                addRow(`floor-${floorId}`, period['time_from'], period['time_to'], period['value'])
            }
        }
    }
}

/************************************
 Save
 */
async function save(e) {
    const saveBtn = e.target
    const day = saveBtn.getAttribute('date')
    const modeSelector = document.querySelector('.sidebar input[id=mode]')

    const data = []

    for (let floor = 0; floor <= 1; floor++) {
        const floorContainer = document.querySelector(`.floors .floor-${floor}`)
        const value = floorContainer.querySelector('.mode.auto input[name=auto-temp]').value
        const mode = modeSelector.getAttribute(`floor-${floor}-value`) ?? 'auto'

        const periodsData = []
        const periods = floorContainer.querySelectorAll('.mode.manual .rows .row')
        for (const period of periods) {
            const time_from = period.querySelector('input[type=time][name=from]').value
            const time_to = period.querySelector('input[type=time][name=to]').value
            const value = period.querySelector('input[type=number].auto-temp').value
            periodsData.push({
                time_from,
                time_to,
                value
            })
        }

        data.push({
            floor,
            day,
            value,
            mode,
            periods: periodsData
        })
    }

    await axios.post(apiUrl, data)

    removeLocalData(day)
}

document.querySelector('.sidebar a.save')
    .addEventListener('click', save)