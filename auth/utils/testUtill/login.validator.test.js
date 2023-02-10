const app = require('../../../app')
const request = require("supertest");
const { STRING } = require('../../../common/constants/data.type')
const { USER_NOT_CREATED, INCORRECT_PASSWORD } = require('../../constants/messages')
const { LOGIN_VALID_VALUE, LOGIN_INVALID_EMAIL, LOGIN_INVALID_PASSWORD } = require('../../../common/constants/objects')

describe('testing login validator', () => {
    test('testing with valid value', async () => {
        const { body } = await request(app).post('/auth/login').send(LOGIN_VALID_VALUE)

        expect(typeof body.token).toBe(STRING)
    })
    test('testing with invalid email', async () => {
        const { body } = await request(app).post('/auth/login').send(LOGIN_INVALID_EMAIL)

        expect(body.msg).toBe(USER_NOT_CREATED)
    })
    test('testing with invalid password', async () => {
        const { body } = await request(app).post('/auth/login').send(LOGIN_INVALID_PASSWORD)

        expect(body.msg).toBe(INCORRECT_PASSWORD)
    })
})
