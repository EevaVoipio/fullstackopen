import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Switch, Route, useRouteMatch } from 'react-router-dom'

import Bloglist from './components/Bloglist'
import Blogform from './components/Blogform'
import Loginform from './components/Loginform'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import UserList from './components/UserList'
import UserInfo from './components/UserInfo'
import BlogInfo from './components/BlogInfo'
import Menu from './components/Menu'

import { setNotification } from './reducers/notificationReducer'
import { loginUser, logoutUser, getUser } from './reducers/userReducer'
import { initializeBlogs, createBlog } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userListReducer'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const userList = useSelector((state) => state.userList)
  const blogs = useSelector((state) => state.blogs)

  const blogFormRef = useRef()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      dispatch(loginUser(username, password))
      setUsername('')
      setPassword('')
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
    dispatch(logoutUser())
  }

  const handleCreateBlog = async (blogObject) => {
    try {
      dispatch(createBlog(blogObject))
      blogFormRef.current.toggleVisibility()
      dispatch(
        setNotification(
          {
            message: `new blog ${blogObject.title} added`,
            type: 'success'
          },
          5
        )
      )
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

  const handleCancelCreateBlog = async () => {
    blogFormRef.current.toggleVisibility()
  }

  useEffect(() => {
    dispatch(getUser())
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  const blogForm = () => (
    <Togglable ref={blogFormRef}>
      <Blogform
        handleCreateBlog={handleCreateBlog}
        handleCancelCreateBlog={handleCancelCreateBlog}
      />
    </Togglable>
  )

  const userMatch = useRouteMatch('/users/:id')
  const userForInfoPage = userMatch
    ? userList.find((user) => user.id === userMatch.params.id)
    : null

  const blogMatch = useRouteMatch('/blogs/:id')
  const blogForInfoPage = blogMatch
    ? blogs.find((blog) => blog.id === blogMatch.params.id)
    : null

  return (
    <div className='container'>
      {user !== null && (
        <div>
          <Menu user={user} handleLogout={handleLogout} />
          <Notification />
          <div className='center-content'>
            <div>
              <h1 className='header'>Blog app</h1>
            </div>
            <Switch>
              <Route path='/users/:id'>
                <UserInfo user={userForInfoPage} />
              </Route>
              <Route path='/users'>
                <div>
                  <h2 className='header'>Users</h2>
                  <UserList />
                </div>
              </Route>
              <Route path='/blogs/:id'>
                <BlogInfo blog={blogForInfoPage} user={user} />
              </Route>
              <Route path='/'>
                <div>
                  <Bloglist blogs={blogs} />
                  {blogForm()}
                </div>
              </Route>
            </Switch>
          </div>
        </div>
      )}
      {user === null && (
        <Loginform
          setUsername={setUsername}
          setPassword={setPassword}
          handleLogin={handleLogin}
          username={username}
          password={password}
        />
      )}
    </div>
  )
}

export default App
