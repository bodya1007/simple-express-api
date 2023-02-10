const CREATE_USER_VALID_VALUE = { first_name: 'testedvalidNamenation' + Date.now(), last_name: 'last_name', email: 'testedValidEmails@gmail.com' + Math.random(), password: 'password', phone: '231231231' }
const CREATE_USER_INVALID_FIRST_NAME = { last_name: 'last_name', email: 'testedUndefined@gmail.com', password: 'password', phone: '231231231' }
const CREATE_USER_INVALID_EMAIL = { first_name: 'testedUndefined', last_name: 'last_name', password: 'password', phone: '231231231' }
const CREATE_USER_INVALID_LAST_NAME = { first_name: 'testedUndefined', password: 'password', email: 'testedUndefined@gmail.com', phone: '231231231' }
const CREATE_USER_INVALID_PHONE = { first_name: 'testedUndefined', last_name: 'last_name', email: 'testedUndefined@gmail.com', password: 'password', }
const CREATE_USER_INVALID_PASSWORD = { first_name: 'testedUndefined', last_name: 'last_name', email: 'testedUndefined@gmail.com', phone: '231231231' }
const CREATE_USER_DUBLICATED_FIRST_NAME = { first_name: 'bodya', last_name: 'last_name', email: 'testedValidEmail@gmail.com', password: 'password', phone: '231231231' }
const CREATE_USER_DUBLICATED_EMAIL = { first_name: 'bodyaa', last_name: 'last_name', email: 'testedValidEmail@gmail.com', password: 'password', phone: '231231231' }
const UPDATE_USER_VALID_LAST_NAME = { last_name: 'tested' }
const UPDATE_USER_INVALID_EMAIL = { email: 'testedUsasaandefineom' }
const UPDATE_USER_INVALID_PHONE = { phone: 'testedUsasaandefineom' }
const UPDATE_USER_DUBLICATED_FIRST_NAME = { first_name: 'bodya' }
const UPDATE_USER_DUBLICATED_EMAIL = { email: 'bodya@gmail.com' }
const GET_USER_VALID_EMAIL = 'bodya@gmail.com'
const GET_USER_INVALID_EMAIL = 'TESTINGVALUE'
const GET_USER_VALID_FIRST_NAME = 'bodya'
const GET_USER_INVALID_VALUES = [0, 12312312, 0.1212]
const GET_USER_VALID_ID = 206
const DELETE_USER_INVALID_URL = '0'
const LOGIN_VALID_VALUE = { email: 'newtested@g2sddfsmsail.sdom', password: '343s232' }
const LOGIN_INVALID_EMAIL = { email: 'newtested@g2sddfsmsasdfsdfil.sdom', password: '343s232' }
const LOGIN_INVALID_PASSWORD = { email: 'newtested@g2sddfsmsail.sdom', password: 'passworded' }
const GET_TOKEN_VALID_VALUE = { body: { email: 'bodya@gmail.com' } }
const INVALID_URL = 'undefined'

module.exports = {
    CREATE_USER_VALID_VALUE,
    CREATE_USER_INVALID_FIRST_NAME,
    CREATE_USER_INVALID_EMAIL,
    CREATE_USER_INVALID_LAST_NAME,
    CREATE_USER_INVALID_PHONE,
    CREATE_USER_INVALID_PASSWORD,
    CREATE_USER_DUBLICATED_FIRST_NAME,
    CREATE_USER_DUBLICATED_EMAIL,
    UPDATE_USER_VALID_LAST_NAME,
    UPDATE_USER_INVALID_EMAIL,
    UPDATE_USER_INVALID_PHONE,
    UPDATE_USER_DUBLICATED_FIRST_NAME,
    UPDATE_USER_DUBLICATED_EMAIL,
    GET_USER_VALID_EMAIL,
    GET_USER_INVALID_EMAIL,
    GET_USER_VALID_FIRST_NAME,
    GET_USER_INVALID_VALUES,
    GET_USER_VALID_ID,
    DELETE_USER_INVALID_URL,
    LOGIN_VALID_VALUE,
    LOGIN_INVALID_EMAIL,
    LOGIN_INVALID_PASSWORD,
    GET_TOKEN_VALID_VALUE,
    INVALID_URL
}


