const express = require('express')
const cors = require('cors')
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

const light = {}

app.use(cors())
app.use(express.json());

app.post('/temp', (req, res) => {
    const body = req.body;
    res.json(temp)
})

app.get('/temp', (req, res) => {
    res.json(temp)
})

app.post('/light', (req, res) => {
    const {room, value} = req.body;
    light[room] = parseInt(value)
    res.send('Hello World!')
})

app.get('/light', (req, res) => {
    res.json(light)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})