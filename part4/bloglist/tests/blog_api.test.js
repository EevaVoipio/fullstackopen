const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const api = supertest(app)

describe('there are 2 blogs saved initially', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    console.log('cleared')

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

      const savedBlog = blogsAtEnd.find(
        (blog) => blog.title === 'Sex and the City'
      )
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
  })

  describe('deleting existing note', () => {
    test('blog is deleted if correct id is given', async () => {
      const blogsAtBeginning = await helper.blogsInDb()
      const id = blogsAtBeginning[0].id
      await api.delete(`/api/blogs/${id}`).expect(204)

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
      console.log(blogsAtEnd[0].id)
      expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
      const titles = blogsAtEnd.map((blog) => blog.title)

      expect(titles).toContain('Updated title')
    })
  })

  afterAll(() => {
    mongoose.connection.close()
  })
})
