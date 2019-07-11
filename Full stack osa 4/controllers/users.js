const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User
    .find({}).populate('blogs',{ url: 1, title: 1, author: 1, id: 1 })
    response.json(users.map(u => u.toJSON()))
  })

usersRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body
    if(!body.password || body.password.length <3){
        const err = new Error('Password is required and it needs to be atleast 3 letters.')
        err.name = 'ValidationError'
        next(err)
    }else{
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)

        const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
        })

        const savedUser = await user.save()

        response.json(savedUser)
    }
  } catch (exception) {
    next(exception)
  }
})

module.exports = usersRouter