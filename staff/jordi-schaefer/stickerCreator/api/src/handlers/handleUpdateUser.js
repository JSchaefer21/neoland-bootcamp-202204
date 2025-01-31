const { updateUser } = require('../logic')
const { verifyToken, handleErrorsAndRespond } = require('./helpers')

module.exports = (req, res) => {
    try {
        const userId = verifyToken(req)

        const { body: { name, password, age, email, phone } } = req

        updateUser(userId, name, password, age, email, phone)
            .then(() => res.status(204).send())  // devuelvo estatus modificado ok
            .catch(error => handleErrorsAndRespond(error, res))
    } catch (error) {
        handleErrorsAndRespond(error, res)
    }
}