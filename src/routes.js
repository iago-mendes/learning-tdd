const routes = require('express').Router()

const session = require('./app/controllers/session')

routes.post('/sessions', session.store)

module.exports = routes