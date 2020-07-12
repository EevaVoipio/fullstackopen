import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Bloglist from './components/Bloglist'
import Blogform from './components/Blogform'
import Button from './components/Button'
import Loginform from './components/Loginform'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, createBlog } from './reducers/blogReducer'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)

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
      dispatch(
        setNotification({ message: 'wrong credentials', type: 'error' }, 5)
      )
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const handleCreateBlog = async (blogObject) => {
    try {
      dispatch(createBlog(blogObject))
      dispatch(
        setNotification(
          {
            message: `new blog ${blogObject.title} added`,
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

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

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
          <Bloglist blogs={blogs} user={user} />
        </div>
      )}
    </div>
  )
}

export default App
