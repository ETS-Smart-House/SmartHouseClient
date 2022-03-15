const express = require('express')
const app = express()
const port = 3000

const temp = {
    "15/3/2022": {
        "mode": "manual", "times": {
            "07:00-09:00": 20, "12:00-21:00": 25, "21:00-23:59": 202
        }
    }, "16/3/2022": {
        "mode": "manual", "times": {
            "07:00-09:30": 21, "12:00-21:00": 25, "21:00-23:59": 20
        }
    }, "17/3/2022": {
        "mode": "auto", "temperature": 22
    }
}

app.get('/temp', (req, res) => {
    res.json(temp)
})


app.get('/light', (req, res) => {

    // Light

    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})