const Sequelize = require('sequelize');
require('dotenv').config();

const db = new Sequelize(`${process.env.DB}`);

db
  .authenticate()
  .then(() => {
    console.log('Connected to DB');
  })
  .catch(err => {
    console.error('Unable to connect to DB', err);
  })
const Book = db.define('Book', {
  title: { type: Sequelize.STRING },
  author: { type: Sequelize.STRING },
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  }
})

module.exports = { Book };