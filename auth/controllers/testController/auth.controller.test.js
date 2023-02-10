const app = require('../../../app')
const request = require("supertest");
const { STRING } = require('../../../common/constants/data.type')
const { LOGIN_VALID_VALUE } = require('../../../common/constants/objects')

test('testing login', async () => {
    const { body } = await request(app).post('/auth/login').send(LOGIN_VALID_VALUE)

    expect(typeof body.token).toBe(STRING)
})
