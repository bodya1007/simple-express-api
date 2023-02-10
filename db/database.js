const Sequelize = require('sequelize');
require('dotenv').config()

const sequelize = new Sequelize(
  process.env.data_base_name,
  process.env.data_base,
  process.env.data_base_password,
  {
    host: process.env.data_base_host,
    dialect: process.env.data_base_dialect
  }
)

module.exports = sequelize;