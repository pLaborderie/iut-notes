require('dotenv').config();

module.exports = {
  development: {
    username: process.env.PG_USERNAME,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    host: process.env.PG_HOST,
    port: PROCESS.ENV.PG_PORT,
    ssl: true,
    dialect: "postgres"
  },
  test: {
    username: process.env.PG_USERNAME,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    host: process.env.PG_HOST,
    port: PROCESS.ENV.PG_PORT,
    ssl: true,
    dialect: "postgres"
  },
  production: {
    username: process.env.PG_USERNAME,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    host: process.env.PG_HOST,
    port: PROCESS.ENV.PG_PORT,
    ssl: true,
    dialect: "postgres"
  }
};