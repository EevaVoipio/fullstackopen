import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux'

import Button from './Button'

import { likeBlog, deleteBlog, commentBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogInfo = ({ blog, user }) => {
  const dispatch = useDispatch()
  const [comment, setComment] = useState('')

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

  const addComment = async (event) => {
    event.preventDefault()
    const updatedBlog = {
      ...blog,
      comments: blog.comments.concat(comment),
      user: blog.user._id
    }
    dispatch(commentBlog(blog.id, updatedBlog))
    setComment('')
  }

  if (!blog) {
    return null
  }

  let index = 0 //Could this cause problems?

  return (
    <div>
      <h2 className='header'>{blog.title}</h2>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div id='likes'>
        {blog.likes} likes
        <Button handleClick={handleLike} text='Like' />
      </div>
      <div>Added by {blog.user.name}</div>
      {user.username === blog.user.username && (
        <Button handleClick={handleRemove} text='remove' />
      )}
      <div>
        <h3>Comments</h3>
        <ul>
          {blog.comments.map((comment) => (
            <div key={index++}>{comment}</div>
          ))}
        </ul>
        <Form>
          <Form.Group>
            <Form.Control
              className='form'
              size='sm'
              id='comment'
              type='text'
              value={comment}
              name='Comment'
              placeholder='Add a comment...'
              onChange={({ target }) => setComment(target.value)}
            />
            <Button
              handleClick={addComment}
              id='comment-submit-button'
              type='submit'
              text='Comment'
            />
          </Form.Group>
        </Form>
      </div>
    </div>
  )
}

export default BlogInfo
