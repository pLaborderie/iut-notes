const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
let db = {};

require('dotenv').config();
const { PG_DATABASE, PG_USERNAME, PG_PASSWORD, PG_HOST, PG_PORT } = process.env;
const sequelize = new Sequelize(PG_DATABASE, PG_USERNAME, PG_PASSWORD, {
  host: PG_HOST,
  port: PG_PORT || 5432,
  ssl: true,
  dialect: 'postgres',
  dialectOptions: {
    ssl: true,
  },
  dialectModule: require('pg')
});

// Load all models in folder
// and associate them to Sequelize context
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db
  .sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to DB');
  })
  .catch(err => {
    console.error('Unable to connect to DB', err);
  });

module.exports = db;
