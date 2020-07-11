import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Blog from './components/Blog'
import Blogform from './components/Blogform'
import Button from './components/Button'
import Loginform from './components/Loginform'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { setNotification } from './reducers/notificationReducer'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [update, setUpdate] = useState(null)
  const dispatch = useDispatch()

  const blogFormRef = useRef()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password
      })

      setUser(user)
      setUsername('')
      setPassword('')
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      dispatch(
        setNotification(
          {
            message: 'logged in',
            type: 'success'
          },
          5
        )
      )
    } catch (exception) {
      dispatch(setNotification({ message: 'wrong credentials', type: 'error' }))
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const handleCreateBlog = async (blogObject) => {
    try {
      const blog = await blogService.create(blogObject)
      setBlogs(blogs.concat(blog))
      dispatch(
        setNotification(
          {
            message: `new blog ${blog.title} added`,
            type: 'success'
          },
          5
        )
      )
      blogFormRef.current.toggleVisibility()
    } catch (exception) {
      dispatch(
        setNotification(
          {
            message:
              'blog could not be added, mandatory information is missing',
            type: 'error'
          },
          5
        )
      )
    }
  }

  const handleLikeBlog = async (id, blogObject) => {
    try {
      const updatedBlog = await blogService.update(id, blogObject)
      setBlogs(blogs.map((blog) => (blog.id !== id ? blog : updatedBlog)))
      dispatch(
        setNotification(
          {
            message: `successfully liked ${updatedBlog.title}`,
            type: 'success'
          },
          5
        )
      )
    } catch (exception) {
      dispatch(
        setNotification({ message: 'something bad happened', type: 'error' }, 5)
      )
    }
  }

  const handleRemoveBlog = async (id, title, author) => {
    if (window.confirm(`Remove ${title} by ${author}?`)) {
      try {
        await blogService.deleteBlog(id)
        setBlogs(blogs.filter((blog) => blog.id !== id))
        dispatch(
          setNotification(
            {
              message: `${title} was successfully removed`,
              type: 'success'
            },
            5
          )
        )
      } catch (exception) {
        dispatch(
          setNotification(
            { message: 'something bad happened', type: 'error' },
            5
          )
        )
      }
    }
  }

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
    setUpdate(null)
  }, [update])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const blogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <Blogform handleCreateBlog={handleCreateBlog} />
    </Togglable>
  )

  return (
    <div>
      <Notification />
      {user === null && (
        <Loginform
          setUsername={setUsername}
          setPassword={setPassword}
          handleLogin={handleLogin}
          username={username}
          password={password}
        />
      )}
      {user !== null && (
        <div>
          <h2>blogs</h2>
          <p>
            {user.name} logged in{' '}
            <Button handleClick={handleLogout} text='logout' />
          </p>
          {blogForm()}
          <div id='bloglist'>
            {blogs
              .sort((a, b) => b.likes - a.likes)
              .map((blog) => (
                <Blog
                  key={blog.id}
                  blog={blog}
                  handleLikeBlog={handleLikeBlog}
                  handleRemoveBlog={handleRemoveBlog}
                  setUpdate={setUpdate}
                  user={user}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default App
