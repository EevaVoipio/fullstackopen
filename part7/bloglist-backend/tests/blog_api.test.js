const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const api = supertest(app)

mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false)

describe('there are 2 blogs saved initially', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    console.log('cleared')
    const users = await helper.usersInDb()
    const user = users[0]
    helper.initialBlogs.forEach((blog) => {
      blog['user'] = user.id
    })
    await Blog.insertMany(helper.initialBlogs)
    console.log('saved')
    console.log('done')
  })

  describe('blogs are fetched correctly', () => {
    test('blogs are returned as json', async () => {
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('two blogs are returned', async () => {
      const response = await api.get('/api/blogs')

      expect(response.body).toHaveLength(helper.initialBlogs.length)
    })

    test('blogs have id field', async () => {
      const response = await api.get('/api/blogs')
      Object.values(response.body).forEach((value) => {
        expect(value.id).toBeDefined()
      })
    })
  })

  describe('addition of a new note', () => {
    const newBlog = {
      title: 'Sex and the City',
      author: 'Carmen Mcguill',
      url: 'sexandthecity.fi'
    }

    test('a valid blog can be added ', async () => {
      const response = await api.post('/api/login').send({
        username:'root',
        password:'sekret',
      }).expect(200).expect('Content-Type', /application\/json/)
      const token = response.body.token
      await api
        .post('/api/blogs')
        .set('Authorization', 'bearer ' + token)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

      const titles = blogsAtEnd.map((blog) => blog.title)
      expect(titles).toContain('Sex and the City')
    })

    test('likes gets default value 0 if it is not given', async () => {
      const response = await api.post('/api/login').send({
        username:'root',
        password:'sekret',
      }).expect(200).expect('Content-Type', /application\/json/)
      const token = response.body.token
      await api
        .post('/api/blogs')
        .set('Authorization', 'bearer ' + token)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

      const savedBlog = blogsAtEnd.find(
        (blog) => blog.title === 'Sex and the City'
      )
      expect(savedBlog.likes).toEqual(0)
    })

    test('blog is rejected if it does not contain title or url', async () => {
      const response = await api.post('/api/login').send({
        username:'root',
        password:'sekret',
      }).expect(200).expect('Content-Type', /application\/json/)
      const token = response.body.token
      const newInvalidBlog = {
        title: 'Sex and the City',
        author: 'Carmen Mcguill'
      }
      await api
        .post('/api/blogs')
        .set('Authorization', 'bearer ' + token)
        .send(newInvalidBlog)
        .expect(400)
      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
    })

    test('blog cannot be added without valid token ', async () => {
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
    })
  })

  describe('deleting existing note', () => {
    test('blog is deleted if correct id is given', async () => {
      const response = await api.post('/api/login').send({
        username:'root',
        password:'sekret',
      }).expect(200).expect('Content-Type', /application\/json/)
      const token = response.body.token
      const blogsAtBeginning = await helper.blogsInDb()
      const id = blogsAtBeginning[0].id
      await api
        .delete(`/api/blogs/${id}`)
        .set('Authorization', 'bearer ' + token)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd.length).toBe(helper.initialBlogs.length - 1)
      const ids = blogsAtEnd.map((blog) => blog.id)

      expect(ids).not.toContain(id)
    })
  })

  describe('modifying existing note', () => {
    test('blog is modified if correct id is given', async () => {
      const blogsAtBeginning = await helper.blogsInDb()
      const updatedBlog = { ...blogsAtBeginning[0], title: 'Updated title' }
      const id = updatedBlog.id
      await api.put(`/api/blogs/${id}`).send(updatedBlog).expect(200)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
      const titles = blogsAtEnd.map((blog) => blog.title)

      expect(titles).toContain('Updated title')
    })
  })

  afterAll(() => {
    mongoose.connection.close()
  })
})
