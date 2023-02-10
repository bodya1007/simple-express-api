const app = require('../../../app');
const request = require("supertest");
const { USER_WAS_DELETED } = require('../../constants/messages')
const { OBJECT, STRING, NUMBER } = require('../../../common/constants/data.type')
const { CREATE_USER_VALID_VALUE, UPDATE_USER_VALID_LAST_NAME, GET_USER_VALID_ID } = require('../../../common/constants/objects')

describe('testing get all users function', () => {
    test('testing with valid value', async () => {
        const { body } = await request(app).get('/user')

        if (body.length == 0) {
            expect(users).toBeNull()
        } else {
            body.forEach(user => {
                expect(typeof user).toBe(OBJECT)
                expect(typeof user.first_name).toBe(STRING)
                expect(typeof user.last_name).toBe(STRING)
                expect(typeof user.email).toBe(STRING)
                expect(typeof user.phone).toBe(STRING)
                expect(typeof user.password).toBe(STRING)
                expect(typeof user.createdAt).toBe(STRING)
                expect(typeof user.id).toBe(NUMBER)
            });
        }

        expect(typeof body).toBe(OBJECT)
    })
})
describe('testing get one user function', () => {
    test('testing with valid value', async () => {
        const { body } = await request(app).get('/user/' + GET_USER_VALID_ID)

        expect(typeof body.id).toBe(NUMBER)
        expect(typeof body).toBe(OBJECT)
    })
})

describe('testing create user function', () => {
    test('testing with valid value', async () => {
        const { body } = await request(app).post('/user').send(CREATE_USER_VALID_VALUE)

        await request(app).delete('/user/' + body.id)

        expect(typeof body.id).toBe(NUMBER)
        expect(typeof body).toBe(OBJECT)
    })
})
describe('testing update user function ', () => {
    test('testing with valid value', async () => {
        const { body } = await request(app).put('/user/' + GET_USER_VALID_ID).send(UPDATE_USER_VALID_LAST_NAME)

        expect(typeof body.id).toBe(NUMBER)
        expect(typeof body).toBe(OBJECT)
    })
})
describe('testing delete user function', () => {
    test('testing delete user with valid value', async () => {
        const { body } = await request(app).post('/user').send(CREATE_USER_VALID_VALUE)
        const { _body } = await request(app).delete('/user/' + body.id)

        expect(_body.msg).toBe(USER_WAS_DELETED)
    })

})
