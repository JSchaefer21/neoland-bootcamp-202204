const { verify } = require('jsonwebtoken')

/**
* Parses JWT from Express Request, verifies it (against the secret) and returns the payload.
* 
* @param {Request} req The HTTP request (Express server)
* 
* @retuns {String} userId The user id
*/
function verifyToken(req) {
    
    const {headers: { authorization }} = req
    //const token = authorization.split(' ')[1]
    const [noInteresa, token] = authorization.split(' ') // [ Bearer, 344834829434]

    //const payload = verify(token, 'secretito que codifica')
    //const { sub: userId} = payload
    const { sub: userId } = verify(token, process.env.JWT_SECRET)

    return userId
}

module.exports = verifyToken