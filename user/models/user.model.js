const db = require('../../db/database');
const user = require('../../json/user.json')
const User = db.define('User', user)

module.exports = User;