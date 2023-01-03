let axios = require('axios');
require('dotenv').config()
const {CONNECTION_STRING} = process.env
const Sequelize = require('sequelize')

const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres', 
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})

let randomAnimal;

module.exports = {
    displayAnimal: async (req, res) => {
        axios.get('https://private-anon-34d8d5d577-endangeredanimals.apiary-mock.com/single_animal_data/')
        .then(res => {const animal= res.data
        const randomIndex = Math.floor(Math.random() * animal.length)
        randomAnimal = animal[randomIndex]})
        .catch(err =>console.log(err))
        res.status(200).send(randomAnimal)
    },
    seed: (req, res) => {
        sequelize.query(`
        create table markers(
            marker_id serial primary key,
            wildlife_name varchar(50),
            wildlife_picture varchar,
            notes text,
            date timestamp
        );`)
        .then(() => {
            console.log('DB seeded!')
            res.sendStatus(200)
        }).catch(err => console.log('error seeding DB', err))
    
    },

    addMarker: (req,res) => {
        const {marker_label} = req.body
        sequelize.query(`
        insert into markers values(DEFAULT)`)
        sequelize.query(`
        SELECT * FROM markers ORDER BY marker_id DESC LIMIT 1`)
        .then((dbRes) => 
         res.status(200).send(dbRes[0][0])
        )
        .catch((err) => console.log(err));
    },
    updateMarker: (req,res) => {
        const {wName, wPic, wNotes, wDate, marker_id} = req.body
        console.log(req.body)
        sequelize.query(`
        update markers
        set wildlife_name = '${wName}', wildlife_picture = '${wPic}', notes = '${wNotes}', date = ${wDate} 
        WHERE marker_id = ${marker_id}; `)
        .then((dbRes) => res.status(200).send(dbRes)).catch((err) => console.log(err));

    },
    getEntries: (req, res) => {
        sequelize.query(` SELECT * FROM data_entry`)
        .then((dbRes) => {
            res.status(200).send(dbRes[0])
         })
         .catch(err => console.log(err))

    
    },
}
