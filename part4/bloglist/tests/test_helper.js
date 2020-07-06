const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'Valeäiti',
    author: 'Hanne Kettunen',
    url: 'valeaiti',
    likes: 3,
    id: '5f01822a3557cbcac0be47e7'
  },
  {
    title: 'Lähiömutsi',
    author: 'Hanne Valtari',
    url: 'https://lahiomutsi.fi/',
    likes: 5,
    id: '5f01829a3557cbcac0be47e8'
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((u) => u.toJSON())
}

module.exports = { initialBlogs, blogsInDb, usersInDb }
