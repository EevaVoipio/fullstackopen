import React, { useState } from 'react'
import { Form, Row, Col } from 'react-bootstrap'

import Button from './Button'

const Blogform = ({ handleCreateBlog, handleCancelCreateBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const createBlog = async (event) => {
    event.preventDefault()
    await handleCreateBlog({
      title: title,
      author: author,
      url: url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const cancelCreateBlog = async (event) => {
    event.preventDefault()
    await handleCancelCreateBlog()
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2 className='form-header'>Create new blog</h2>
      <Form>
        <Form.Group as={Row}>
          <Form.Label column sm={2}>
            title
          </Form.Label>
          <Col sm={7}>
            <Form.Control
              size='sm'
              id='title'
              type='text'
              value={title}
              name='Title'
              onChange={({ target }) => setTitle(target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm={2}>
            author{' '}
          </Form.Label>
          <Col sm={7}>
            <Form.Control
              size='sm'
              id='author'
              type='text'
              value={author}
              name='Author'
              onChange={({ target }) => setAuthor(target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm={2}>
            url
          </Form.Label>
          <Col sm={7}>
            <Form.Control
              size='sm'
              id='url'
              type='text'
              value={url}
              name='Url'
              onChange={({ target }) => setUrl(target.value)}
            />
          </Col>
        </Form.Group>
        <Button
          handleClick={createBlog}
          id='blog-submit-button'
          type='submit'
          text='Create'
        />
        <Button
          handleClick={cancelCreateBlog}
          id='blog-submit-button'
          type='submit'
          text='Cancel'
        />
      </Form>
    </div>
  )
}

export default Blogform
