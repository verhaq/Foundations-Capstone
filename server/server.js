require('dotenv').config()
let express = require ('express')
let cors = require('cors')
const {SERVER_PORT} = process.env
const {addEntry} = require('./controller')


let app = express()
app.use(cors())
app.use(express.json())


///have to make the axios call first then this will work
app.post('/add', addEntry)


app.listen(SERVER_PORT, () => console.log(`gliding on ${SERVER_PORT}`))