const app = require('../../../app')
const request = require("supertest");
const { SUCCESSFUL_REQUEST, BAD_REQUEST, NOT_FOUND, CREATED } = require('../../../common/constants/status.code')
const { CREATE_USER_VALID_VALUE, CREATE_USER_INVALID_FIRST_NAME, CREATE_USER_INVALID_EMAIL, CREATE_USER_INVALID_LAST_NAME, CREATE_USER_INVALID_PHONE, CREATE_USER_INVALID_PASSWORD, GET_USER_VALID_ID, INVALID_URL } = require('../../../common/constants/objects')

describe('testing route get/users ', () => {
    test('testing with valid path', async () => {
        const { statusCode } = await request(app).get('/user')

        expect(statusCode).toBe(SUCCESSFUL_REQUEST)
    })
    test('testing with invalid path', async () => {
        const { statusCode } = await request(app).get('/user' + INVALID_URL)

        expect(statusCode).toBe(NOT_FOUND)
    })
})
describe('testing route get/user', () => {
    test('testing with valid path', async () => {
        const { statusCode } = await request(app).get('/user/' + GET_USER_VALID_ID)

        expect(statusCode).toBe(SUCCESSFUL_REQUEST)
    })
    test('testing with invalid path', async () => {
        const { statusCode } = await request(app).get('/user/' + INVALID_URL)

        expect(statusCode).toBe(BAD_REQUEST)
    })
})

describe('testing post route', () => {
    test('testing with valid value', async () => {
        const { statusCode, body } = await request(app).post('/user').send(CREATE_USER_VALID_VALUE)

        await request(app).delete('/user/' + body.id)

        expect(statusCode).toBe(CREATED)
    })
    test('testing with invalid value', async () => {
        const { statusCode } = await request(app).post('/user')

        expect(statusCode).toBe(BAD_REQUEST)
    })
    test('testing with invalid first_name', async () => {
        const { statusCode } = await request(app).post('/user').send(CREATE_USER_INVALID_FIRST_NAME)

        expect(statusCode).toBe(BAD_REQUEST)
    })
    test('testing with invalid email', async () => {
        const { statusCode } = await request(app).post('/user').send(CREATE_USER_INVALID_EMAIL)

        expect(statusCode).toBe(BAD_REQUEST)
    })
    test('testing with invalid last_name', async () => {
        const { statusCode } = await request(app).post('/user').send(CREATE_USER_INVALID_LAST_NAME)

        expect(statusCode).toBe(BAD_REQUEST)
    })
    test('testing with invalid phone', async () => {
        const { statusCode } = await request(app).post('/user').send(CREATE_USER_INVALID_PHONE)

        expect(statusCode).toBe(BAD_REQUEST)
    })
    test('testing with invalid password', async () => {
        const { statusCode } = await request(app).post('/user').send(CREATE_USER_INVALID_PASSWORD)

        expect(statusCode).toBe(BAD_REQUEST)
    })
    test('testing with invalid path', async () => {
        const { statusCode } = await request(app).post('/user/' + INVALID_URL)

        expect(statusCode).toBe(NOT_FOUND)
    })
})
describe('testing put route ', () => {
    test('testing with valid value', async () => {
        const { statusCode } = await request(app).put('/user/' + GET_USER_VALID_ID).send({ last_name: 'tested' })

        expect(statusCode).toBe(SUCCESSFUL_REQUEST)
    })
    test('testing with invalid path', async () => {
        const { statusCode } = await request(app).put('/user/' + INVALID_URL)

        expect(statusCode).toBe(BAD_REQUEST)
    })
})
describe('testing delete route', () => {
    test('testing with valid value', async () => {
        const { body } = await request(app).post('/user').send(CREATE_USER_VALID_VALUE)
        const { statusCode } = await request(app).delete('/user/' + body.id)

        expect(statusCode).toBe(SUCCESSFUL_REQUEST)
    })
    test('testing with invalid path', async () => {
        const { statusCode } = await request(app).delete('/user/' + INVALID_URL)

        expect(statusCode).toBe(BAD_REQUEST)
    })
})
