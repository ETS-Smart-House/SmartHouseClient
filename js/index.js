const latestMeasurementUrl = 'http://localhost:8012/latest-measurement'

window.addEventListener("DOMContentLoaded", async () => {
    const indoor = await getLatestMeasurement('indoor')
    const outdoor = await getLatestMeasurement('outdoor')

    const indoorWrapper = document.querySelector('.quick-temperature .value1')
    const outdoorWrapper = document.querySelector('.quick-temperature .value2')

    indoorWrapper.innerHTML = `${indoor['temperature']}°`
    outdoorWrapper.innerHTML = `${outdoor['temperature']}°`
})

async function getLatestMeasurement(location) {
    let response = await axios.get(latestMeasurementUrl, {
        params: {location}
    })

    return response.data
}