import React, { useState } from 'react'
import Button from './Button'
import { useDispatch } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch()
  const [showDetails, setShowDetails] = useState(false)
  const handleSetShowDetails = () => {
    setShowDetails(!showDetails)
  }

  const handleLike = async (event) => {
    event.preventDefault()
    const likes = blog.likes + 1
    const newBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      user: blog.user._id,
      likes: likes
    }
    try {
      dispatch(likeBlog(blog.id, newBlog))
      dispatch(
        setNotification(
          {
            message: `successfully liked ${newBlog.title}`,
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

  const handleRemove = async (event) => {
    event.preventDefault()
    if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
      try {
        dispatch(deleteBlog(blog.id))
        dispatch(
          setNotification(
            {
              message: `${blog.title} was successfully removed`,
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

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle} id='blog'>
      {!showDetails && (
        <div id='blogtitle'>
          {blog.title} {blog.author}
          <Button handleClick={handleSetShowDetails} text='view' />
        </div>
      )}
      {showDetails && (
        <div>
          <div id='blogtitle'>
            {blog.title} {blog.author}
            <Button handleClick={handleSetShowDetails} text='hide' />
          </div>
          <div>{blog.url}</div>
          <div id='likes'>
            likes {blog.likes} <Button handleClick={handleLike} text='like' />
          </div>
          <div>{blog.user['name']}</div>
          {user.username === blog.user.username && (
            <Button handleClick={handleRemove} text='remove' />
          )}
        </div>
      )}
    </div>
  )
}

export default Blog
