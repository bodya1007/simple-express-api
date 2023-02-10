const app = require('../../../app')
const request = require("supertest");
const { OBJECT, NUMBER } = require('../../../common/constants/data.type')
const { FIRST_NAME, LAST_NAME, EMAIL, PHONE } = require('../../../common/constants/column.name')
const { USER_NOT_FIND, SHOULD_PUT_NUMBER, USER_WITH_THIS_FIRST_NAME_WAS_CREATED, USER_WITH_THIS_EMAIL_WAS_CREATED, MUST_BE_PASSWORD, SET_RIGHT_PHONE_FORMATE, INVALID_VALUE } = require('../../constants/messages')
const { CREATE_USER_VALID_VALUE, CREATE_USER_INVALID_FIRST_NAME, CREATE_USER_INVALID_EMAIL, CREATE_USER_INVALID_LAST_NAME, CREATE_USER_INVALID_PHONE, CREATE_USER_INVALID_PASSWORD, GET_USER_VALID_ID, CREATE_USER_DUBLICATED_FIRST_NAME, CREATE_USER_DUBLICATED_EMAIL, UPDATE_USER_VALID_LAST_NAME, UPDATE_USER_DUBLICATED_FIRST_NAME, UPDATE_USER_DUBLICATED_EMAIL, UPDATE_USER_INVALID_EMAIL, UPDATE_USER_INVALID_PHONE, DELETE_USER_INVALID_URL, INVALID_URL } = require('../../../common/constants/objects')

describe('testing get one user validation', () => {
    test('testing with valid value', async () => {
        const { body } = await request(app).get('/user/' + GET_USER_VALID_ID)

        expect(typeof body).toBe(OBJECT)
    })
    test('testing with invalid value', async () => {
        const { body } = await request(app).get('/user/' + INVALID_URL)

        expect(body.msg).toBe(SHOULD_PUT_NUMBER)
    })
})

describe('testing create user validation', () => {
    test('testing with valid value', async () => {
        const { body } = await request(app).post('/user').send(CREATE_USER_VALID_VALUE)

        await request(app).delete('/user/' + body.id)

        expect(typeof body).toBe(OBJECT)
        expect(typeof body.id).toBe(NUMBER)
    })
    test('testing with dublicated first_name', async () => {
        const { body } = await request(app).post('/user').send(CREATE_USER_DUBLICATED_FIRST_NAME)

        expect(body.msg).toBe(USER_WITH_THIS_FIRST_NAME_WAS_CREATED)
    })
    test('testing with dublicated email', async () => {
        const { body } = await request(app).post('/user').send(CREATE_USER_DUBLICATED_EMAIL)

        expect(body.msg).toBe(USER_WITH_THIS_EMAIL_WAS_CREATED)
    })
    test('testing without password', async () => {
        const { body } = await request(app).post('/user').send(CREATE_USER_INVALID_PASSWORD)

        expect(body.msg).toBe(MUST_BE_PASSWORD)
    })
    test('testing with invalid first_name', async () => {
        const { body } = await request(app).post('/user').send(CREATE_USER_INVALID_FIRST_NAME)

        expect(typeof body).toBe(OBJECT)
        expect(body[0].msg).toBe(INVALID_VALUE)
        expect(body[0].param).toBe(FIRST_NAME)
    })
    test('testing with invalid email', async () => {
        const { body } = await request(app).post('/user').send(CREATE_USER_INVALID_EMAIL)

        expect(typeof body).toBe(OBJECT)
        expect(body[0].msg).toBe(INVALID_VALUE)
        expect(body[0].param).toBe(EMAIL)
    })
    test('testing with invalid last_name', async () => {
        const { body } = await request(app).post('/user').send(CREATE_USER_INVALID_LAST_NAME)

        expect(typeof body).toBe(OBJECT)
        expect(body[0].msg).toBe(INVALID_VALUE)
        expect(body[0].param).toBe(LAST_NAME)
    })
    test('testing with invalid phone', async () => {
        const { body } = await request(app).post('/user').send(CREATE_USER_INVALID_PHONE)

        expect(body[0].msg).toBe(SET_RIGHT_PHONE_FORMATE)
        expect(body[0].param).toBe(PHONE)
    })

})
describe('testing update user validation', () => {
    test('testing with valid value', async () => {
        const { body } = await request(app).put('/user/' + GET_USER_VALID_ID).send(UPDATE_USER_VALID_LAST_NAME)

        expect(typeof body).toBe(OBJECT)
    })
    test('testing with invalid url', async () => {
        const { body } = await request(app).put('/user/' + INVALID_URL)

        expect(body.msg).toBe(SHOULD_PUT_NUMBER)
    })
    test('testing with dublicated first_name', async () => {
        const { body } = await request(app).put('/user/' + GET_USER_VALID_ID).send(UPDATE_USER_DUBLICATED_FIRST_NAME)

        expect(body.msg).toBe(USER_WITH_THIS_FIRST_NAME_WAS_CREATED)
    })
    test('testing with dublicated email value', async () => {
        const { body } = await request(app).put('/user/' + GET_USER_VALID_ID).send(UPDATE_USER_DUBLICATED_EMAIL)

        expect(body.msg).toBe(USER_WITH_THIS_EMAIL_WAS_CREATED)
    })
    test('testing with invalid email', async () => {
        const { body } = await request(app).put('/user/' + GET_USER_VALID_ID).send(UPDATE_USER_INVALID_EMAIL)

        expect(body[0].msg).toBe(INVALID_VALUE)
        expect(body[0].param).toBe(EMAIL)
    })
    test('testing with invalid phone', async () => {
        const { body } = await request(app).put('/user/' + GET_USER_VALID_ID).send(UPDATE_USER_INVALID_PHONE)

        expect(body[0].msg).toBe(SET_RIGHT_PHONE_FORMATE)
        expect(body[0].param).toBe(PHONE)
    })
})
describe('testing delete user', () => {
    test('testing delete user with invalid value', async () => {
        let { body } = await request(app).delete('/user/' + DELETE_USER_INVALID_URL)

        expect(body.msg).toBe(USER_NOT_FIND)
    })
    test('testing delete user with invalid value', async () => {
        let { body } = await request(app).delete('/user/' + INVALID_URL)

        expect(body.msg).toBe(SHOULD_PUT_NUMBER)
    })
})
