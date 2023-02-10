const { STRING } = require('../../../common/constants/data.type')
const authService = require('../auth.service')
const { GET_TOKEN_VALID_VALUE } = require('../../../common/constants/objects')

test('testing get token function with valid value', async () => {
    let token = await authService.getToken(GET_TOKEN_VALID_VALUE)

    expect(typeof token).toBe(STRING)
})