const { deleteNote } = require('../logic')
const { verifyToken, handleErrorsAndRespond } = require('./helpers')

module.exports = (req, res) => {
    try {  
        const userId = verifyToken(req)

        const { params: { noteId } } = req

        deleteNote(userId, noteId)
            .then(() => res.status(204).send())  // devuelvo estatus ok y el token
            .catch(error => handleErrorsAndRespond(error, res))
    } catch (error) {
        handleErrorsAndRespond(error, res)
    }
}