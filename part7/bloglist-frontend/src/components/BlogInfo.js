import React, { useState } from 'react'
import { Form, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
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
      <div className='info'>
        <h2 className='header'>{blog.title} - details</h2>
        <div>
          Url {''}
          <Link className='links' to={blog.url}>
            {blog.url}
          </Link>
        </div>
        <div id='likes'>
          {blog.likes} likes
          <Button handleClick={handleLike} text='Like' />
        </div>
        <div>Added by {blog.user.name}</div>
        {user.username === blog.user.username && (
          <Button handleClick={handleRemove} text='remove' />
        )}
        <h3 className='comment-header'>Comments</h3>
        {blog.comments.map((comment) => (
          <p key={index++}>{comment}</p>
        ))}
      </div>
      <Form>
        <Form.Group as={Row}>
          <Form.Label column sm={1} />
          <Col sm={7}>
            <Form.Control
              size='md'
              id='comment'
              type='text'
              value={comment}
              name='Comment'
              placeholder='Add a comment...'
              onChange={({ target }) => setComment(target.value)}
            />
          </Col>
          <Button
            handleClick={addComment}
            id='comment-submit-button'
            type='submit'
            text='Comment'
          />
        </Form.Group>
      </Form>
    </div>
  )
}

export default BlogInfo
