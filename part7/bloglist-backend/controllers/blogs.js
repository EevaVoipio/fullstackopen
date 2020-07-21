const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', 'username name id')
  response.json(blogs)
})

blogsRouter.get('/:id', (request, response, next) => {
  Blog.findById(request.params.id)
    .then((blog) => {
      if (blog) {
        response.json(blog.toJSON())
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => next(error))
})

blogsRouter.post('/', async (request, response) => {
  const token = request.token
  if (!token) {
    return response.status(401).json({ error: 'token missing' })
  }
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const user = await User.findById(decodedToken.id)
  const body = request.body
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user
  })
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog)
  await user.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const token = request.token
  if (!token) {
    return response.status(401).json({ error: 'token missing' })
  }
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const id = request.params.id
  const blog = await Blog.findById(id)
  if (blog.user.toString() === decodedToken.id.toString()) {
    await Blog.findByIdAndRemove(id)
    const user = await User.findById(decodedToken.id)
    user.blogs = user.blogs.filter((blog) => blog._id.toString() !== id)
    await user.save()
    response.status(204).end()
  } else {
    return response
      .status(401)
      .json({ error: 'user is only allowed to remove his/her own blogs' })
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    request.body,
    {
      new: true
    }
  )
  response.json(updatedBlog)
})

blogsRouter.post('/:id/comments', async (request, response) => {
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    request.body,
    {
      new: true
    }
  )
  response.json(updatedBlog)
})

module.exports = blogsRouter
