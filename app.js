const express = require('express')
const userRoute = require('./user/index')
const authRoute = require('./auth/index')

const app = express()

app.set("view engine", "ejs")
app.use(express.json())
app.use('/', userRoute)
app.use('/auth', authRoute)

module.exports = app

