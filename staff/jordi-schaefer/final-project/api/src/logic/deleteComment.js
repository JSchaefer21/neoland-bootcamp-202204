const { User, Activity } = require('../models')
const { NotFoundError, AuthError } = require('errors')
const { validateStringNotEmptyNoSpaces } = require('validators')

function deleteComment(userId, activityId, commentId) {
    validateStringNotEmptyNoSpaces(userId, 'user id')
    validateStringNotEmptyNoSpaces(activityId, 'activity id')
    validateStringNotEmptyNoSpaces(commentId, 'comment id')
    
    return User.findById(userId)
        .then(user => {
            if (!user) throw new NotFoundError(`user with id ${userId} does not exist`)

            return Activity.findById(activityId)
        })
        .then(activity => {
            if (!activity) throw new NotFoundError(`activity with id ${activityId} does not exist`)

            const comment= activity.comments.find(comment => comment._id.toString() === commentId)
            
            if (comment == null) throw new NotFoundError(`comment with id ${commentId} does not exist`)
            else if (!comment.user) throw new NotFoundError(`comment does not have user`)
            else if (comment.user.toString() !== userId) throw new AuthError(`comment does not belong to user with id ${userId}`)  
            
            index = activity.comments.findIndex(comment => comment._id.toString() === commentId)
            activity.comments.splice(index, 1)

            return activity.save()
        })
        .then(() => {  })
}

module.exports = deleteComment