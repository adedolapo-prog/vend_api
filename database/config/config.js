const fs = require("fs")
require("dotenv").config()

module.exports = {
  development: {
    dialect: "postgres",
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    seederStorage: "sequelize",
  },
  test: {
    dialect: "postgres",
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    seederStorage: "sequelize",
  },
  production: {
    dialect: "postgres",
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    seederStorage: "sequelize",
  },
}
