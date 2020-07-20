import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  BrowserRouter as Router,
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

import { setNotification } from './reducers/notificationReducer'
import { loginUser, logoutUser, getUser } from './reducers/userReducer'
import { initializeBlogs, createBlog } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userListReducer'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

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

  return (
    <div>
      {user !== null && (
        <div>
          <Notification />
          <h2>blogs</h2>
          <p>
            {user.name} logged in{' '}
            <Button handleClick={handleLogout} text='logout' />
          </p>
          <Switch>
            <Route path='/users'>
              <div>
                <h2>Users</h2>
                <UserList />
              </div>
            </Route>

            <Route path='/'>
              <div>
                {blogForm()}
                <Bloglist />
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
