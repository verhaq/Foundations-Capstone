require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { SERVER_PORT } = process.env
const { addMarker, seed, getEntries, updateMarker, displayAnimal } = require('./controller')

const app = express()
app.use(cors())
app.use(express.json())

app.post('/seed', seed)
///have to make the axios call first then this will work
app.post('/add', addMarker)
app.get('/get', getEntries)
app.put('/update', updateMarker)

//landing page
app.get('/api/animal', displayAnimal)

app.listen(SERVER_PORT, () => console.log(`gliding on ${SERVER_PORT}`))