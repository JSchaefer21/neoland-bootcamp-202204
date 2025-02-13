const { User, Note, Reaction } = require('../models')
const { NotFoundError } = require('../errors')
const { validateStringNotEmptyNoSpaces } = require('../validators')

function toggleReactionOnComment(userId, noteId, commentId, type) {
    validateStringNotEmptyNoSpaces(userId, 'user id')
    validateStringNotEmptyNoSpaces(noteId, 'note id')
    validateStringNotEmptyNoSpaces(commentId, 'comment id')

    return User.findById(userId)
        .then(user => {
            if (!user) throw new NotFoundError(`user with id ${userId} does not exist`)

            return Note.findById(noteId)
        })
        .then(note => {
            if (!note) throw new NotFoundError(`note with id ${noteId} does not exist`)


            debugger


            const comment = note.comments.find(comment => comment._id.toString() === commentId)
            
            if (comment == null) throw new NotFoundError(`comment with id ${commentId} does not exist`)
            else if (comment.user.toString() !== userId) throw new AuthError(`comment does not belong to user with id ${userId}`)  
            
            const index = comment.reactions.findIndex(reaction => reaction.user.toString() === userId)
            if (index < 0) {
                const reaction = new Reaction({ user: userId, type: type })
                comment.reactions.push(reaction)
            }
            else
                comment.reactions.splice(index, 1)
                
            return note.save()
            //return Note.findOneAndUpdate({ _id: noteId},{ $set: {'comments.&._id': commentId}},{ new: comment })
            //return Note.findOneAndUpdate({ _id: noteId},{ $set: {'comments.&._id': commentId}},{ new: comment })
        })
        .then(() => {  })
}

module.exports = toggleReactionOnComment