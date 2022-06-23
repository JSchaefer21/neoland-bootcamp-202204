const { connect, disconnect } = require('mongoose')
const { User } = require('../models')
const { AuthError } = require('errors')
const authenticateUser = require('./authenticateUser')
const { expect } = require('chai')
require('dotenv').config()
const { env: { MONGODB_URL_TEST}} = process

describe('authenticateUser', () => {
    before(() => connect(MONGODB_URL_TEST))

    beforeEach(() => User.deleteMany())

    describe('when user already exists', () => {
        let user

        beforeEach(() => {
            user = new User({name:'Jordi', username: 'Jorgesito', password: '123123123', email: 'jordi@gmail.com'})
            return user.save()
        })
        afterEach(() => User.deleteMany())

        it('succeeds on correct credentials', () =>
            authenticateUser('Jorgesito', '123123123')
                .then(userId => {
                    expect(userId).to.be.a('string')
                    expect(userId).to.equal(user.id)
                })
        )

        it('fails on incorrect password', () =>
            authenticateUser('Jorgesito', '123123123-wrong')
                .then(() => {
                    throw new Error('should not reach this point')
                })
                .catch(error => {
                    expect(error).to.be.instanceOf(AuthError)
                    expect(error.message).to.equal('wrong credentials')
                })
        )

        it('fails on incorrect username', () =>
            authenticateUser('Jorgesito-wrong', '123123123')
                .then(() => {
                    throw new Error('should not reach this point')
                })
                .catch(error => {
                    expect(error).to.be.instanceOf(AuthError)
                    expect(error.message).to.equal('wrong credentials')
                })
        )
    })

    describe('when user does not exist', () => {
        it('fails on credentials from non-existing user', () =>
            authenticateUser('Jorgesito', '123123123')
                .then(() => {
                    throw new Error('should not reach this point')
                })
                .catch(error => {
                    expect(error).to.be.instanceOf(AuthError)
                    expect(error.message).to.equal('wrong credentials')
                })
        )
    })

    afterEach(() => User.deleteMany())
    after(() => disconnect())
})