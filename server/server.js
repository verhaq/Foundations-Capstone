let express = require ('express')
let cors = require('cors')

let app = express()
app.use(cors())
app.use(express.json())



app.get('/api/wildlife', (req,res) => {

})


app.listen(5050, () => (console.log('Server is gliding on 5050...')))