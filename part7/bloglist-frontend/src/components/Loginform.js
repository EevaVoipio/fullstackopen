import React from 'react'
import { Form, Row, Col } from 'react-bootstrap'

import Button from './Button'

const Loginform = ({
  setUsername,
  setPassword,
  handleLogin,
  username,
  password
}) => {
  return (
    <div className='center-content'>
      <h2 className='header'>Login</h2>
      <Form>
        <Form.Group as={Row}>
          <Form.Label column sm={2}>
            username
          </Form.Label>
          <Col sm={7}>
            <Form.Control
              id='username'
              type='text'
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm={2}>
            password
          </Form.Label>
          <Col sm={7}>
            <Form.Control
              id='password'
              type='password'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm={3}></Form.Label>
          <Button
            handleClick={handleLogin}
            id='blog-submit-button'
            type='submit'
            text='Login'
          />
        </Form.Group>
      </Form>
    </div>
  )
}

export default Loginform
