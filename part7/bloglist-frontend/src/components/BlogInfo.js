import React from 'react'

import Button from './Button'
import { useDispatch } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogInfo = ({ blog, user }) => {
  const dispatch = useDispatch()

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
    console.log(blog)
    console.log(newBlog)
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

  if (!blog) {
    return null
  }

  return (
    <div>
      <h1>{blog.title}</h1>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div id='likes'>
        {blog.likes} likes <Button handleClick={handleLike} text='like' />
      </div>
      <div>added by {blog.user.name}</div>
      {user.username === blog.user.username && (
        <Button handleClick={handleRemove} text='remove' />
      )}
    </div>
  )
}

export default BlogInfo
