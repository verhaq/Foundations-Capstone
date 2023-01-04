let axios = require('axios')
let animals = require('./animals.json')
require('dotenv').config()
const { CONNECTION_STRING } = process.env
const Sequelize = require('sequelize')

const sequelize = new Sequelize(CONNECTION_STRING, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false
    }
  }
})

let randomAnimal

module.exports = {
  displayAnimal: async (req, res) => {
    res.status(200).send(animals)
  },
  seed: (req, res) => {
    sequelize
      .query(
        `drop table markers;
        create table markers(
            marker_id serial primary key,
            lat text,
            lng text,
            wildlife_name varchar(50),
            wildlife_picture varchar,
            notes text,
            date date
        );`
      )
      .then(() => {
        console.log('DB seeded!')
        res.sendStatus(200)
      })
      .catch((err) => console.log('error seeding DB', err))
  },

  addMarker: (req, res) => {
    const { lat, lng } = req.body
    sequelize.query(`
        insert into markers (lat,lng) values(${lat},${lng})`)
    sequelize
      .query(
        `
        SELECT * FROM markers ORDER BY marker_id DESC LIMIT 1`
      )
      .then((dbRes) => res.status(200).send(dbRes[0][0]))
      .catch((err) => console.log(err))
  },
  updateMarker: (req, res) => {
    const { wName, wPic, wNotes, wDate, marker_id } = req.body
    console.log(req.body)
    sequelize
      .query(
        `update markers set wildlife_name = '${wName}', wildlife_picture = '${wPic}', notes = '${wNotes}', date = '${wDate}' WHERE marker_id = ${marker_id}; `
      )
      .then((dbRes) => res.status(200).send(dbRes))
      .catch((err) => console.log(err))
  },
  getEntries: (req, res) => {
    sequelize
      .query(` SELECT * FROM markers`)
      .then((dbRes) => {
        res.status(200).send(dbRes[0])
      })
      .catch((err) => console.log(err))
  }
}