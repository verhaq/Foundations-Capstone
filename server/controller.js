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

module.exports = {
    seed: (req, res) => {
        sequelize.query(`
        create table if not exists dataEntry(
            entry_id serial primary key,
            wildlife_name varchar,
            wildlife_picture image,
            notes text(500),
            date datetime
        );`).then(() => {
            console.log('DB seeded!')
            res.sendStatus(200)
        }).catch(err => console.log('error seeding DB', err))
    
    },

    addEntry: (req,res) => {
        const {wildlife_name, wildlife_picture, notes, date } = req.body
        sequelize.query(`
        insert into dataEntry (wildlife_name, wildlife_picture, notes, date)
        values ('${wildlife_name}', '${wildlife_picture}', '${notes}', '${date}'); `)
        .then((dbRes) => res.status(200).send(dbRes)).catch((err) => console.log(err));
    }
}