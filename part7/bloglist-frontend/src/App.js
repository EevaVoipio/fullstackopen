import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Switch,
  Route,
  Link,
  useHistory,
  useRouteMatch
} from 'react-router-dom'

import Bloglist from './components/Bloglist'
import Blogform from './components/Blogform'
import Button from './components/Button'
import Loginform from './components/Loginform'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import UserList from './components/UserList'
import UserInfo from './components/UserInfo'
import BlogInfo from './components/BlogInfo'

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
      dispatch(initializeUsers())
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
    dispatch(getUser())
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  const blogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <Blogform handleCreateBlog={handleCreateBlog} />
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
    <div>
      {user !== null && (
        <div>
          <Notification />
          <h1>blogs</h1>
          <p>
            {user.name} logged in{' '}
            <Button handleClick={handleLogout} text='logout' />
          </p>
          <Switch>
            <Route path='/users/:id'>
              <UserInfo user={userForInfoPage} />
            </Route>
            <Route path='/users'>
              <div>
                <h1>Users</h1>
                <UserList userList={userList} />
              </div>
            </Route>
            <Route path='/blogs/:id'>
              <BlogInfo blog={blogForInfoPage} user={user} />
            </Route>
            <Route path='/'>
              <div>
                {blogForm()}
                <Bloglist blogs={blogs} user={user} />
              </div>
            </Route>
          </Switch>
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
