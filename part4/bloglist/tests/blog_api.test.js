const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  console.log('cleared')

  await Blog.insertMany(helper.initialBlogs)
  console.log('saved')
  console.log('done')
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two blogs', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('blogs have id field', async () => {
  const response = await api.get('/api/blogs')
  Object.values(response.body).forEach((value) => {
    expect(value.id).toBeDefined()
  })
})

const newBlog = {
  title: 'Sex and the City',
  author: 'Carmen Mcguill',
  url: 'sexandthecity.fi'
}

test('a valid blog can be added ', async () => {
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map((blog) => blog.title)
  expect(titles).toContain('Sex and the City')
})

test('likes gets default value 0 if it is not given', async () => {
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

  const savedBlog = blogsAtEnd.find((blog) => blog.title === 'Sex and the City')
  expect(savedBlog.likes).toEqual(0)
})

test('blog is rejected if it does not contain title or url', async () => {
  const newInvalidBlog = {
    title: 'Sex and the City',
    author: 'Carmen Mcguill'
  }
  await api.post('/api/blogs').send(newInvalidBlog).expect(400)
  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
})

afterAll(() => {
  mongoose.connection.close()
})
