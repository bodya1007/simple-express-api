const app = require('../../../app')
const request = require("supertest");
const { SUCCESSFUL_REQUEST, BAD_REQUEST, NOT_FOUND } = require('../../../common/constants/status.code')
const { LOGIN_VALID_VALUE, LOGIN_INVALID_EMAIL, LOGIN_INVALID_PASSWORD, INVALID_URL } = require('../../../common/constants/objects')

describe('testing route login', () => {
    test('testing with valid value', async () => {
        const { statusCode } = await request(app).post('/auth/login').send(LOGIN_VALID_VALUE)

        expect(statusCode).toBe(SUCCESSFUL_REQUEST)
    })
    test('testing with invalid email', async () => {
        const { statusCode } = await request(app).post('/auth/login').send(LOGIN_INVALID_EMAIL)

        expect(statusCode).toBe(BAD_REQUEST)
    })
    test('testing with invalid password', async () => {
        const { statusCode } = await request(app).post('/auth/login').send(LOGIN_INVALID_PASSWORD)

        expect(statusCode).toBe(BAD_REQUEST)
    })
    test('testing with invalid path', async () => {
        const { statusCode } = await request(app).post('/login' + INVALID_URL).send(LOGIN_VALID_VALUE)

        expect(statusCode).toBe(NOT_FOUND)
    })
})
