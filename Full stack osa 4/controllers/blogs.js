
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


blogsRouter.get('', async (request, response) => {
    const blogs = await Blog
      .find({}).populate('user',{ username: 1, name: 1 })
    response.json(blogs.map(blog => blog.toJSON()))
  })

blogsRouter.get('/:id', async (request, response, next) => {
  try{
    const blog = await Blog.findById(request.params.id)
    if (blog) {
       response.json(blog.toJSON())
    } else {
      response.status(404).end()
    }
  } catch(exception) {
    next(exception)
  }
})
  
  blogsRouter.post('',async  (request, response, next) => {
    const body = request.body
    
    try {
      const decodedToken = jwt.verify(request.token, process.env.SECRET)
      if (!request.token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
      }
  
      const user = await User.findById(decodedToken.id)

      let theLikes = 0
      if(body.likes){
      theLikes = body.likes
      }
      const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: theLikes,
        user: user._id
      })

      const savedBlog = await blog.save()
      user.blogs = user.blogs.concat(savedBlog.id)
      await user.save()
      response.json(savedBlog.toJSON())
    } catch(exception) {
      next(exception)
    }
  })

  blogsRouter.delete('/:id', async (request, response, next) =>{
    const blog = await Blog.findById(request.params.id)
    try{
      const decodedToken = jwt.verify(request.token, process.env.SECRET)
      if((!request.token || !decodedToken.id)){
        return response.status(401).json({ error: 'token missing or invalid' })
      }else if(decodedToken.id !== blog.user.toString()){
        return response.status(403).json({ error: 'an user can only delete its own blogs' })
      }else{
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
      }
    }catch (exception){
      next(exception)
    }
  })

  blogsRouter.put('/:id', async (request, response, next) => {
    const blog = await Blog.findById(request.params.id)
    try{
      const body = request.body
      let theLikes = 0
      if(body.likes){
        theLikes = body.likes
      }
      //Updating keeps the user same.
      const newBlog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: theLikes,
        user: blog.user
      }
    
      const res = await Blog.findByIdAndUpdate(request.params.id, newBlog, { new: true, runValidators: true})
      response.status(200).json(res.toJSON())
    }catch(exception){
      next(exception)
    }
  })
   

  module.exports = blogsRouter