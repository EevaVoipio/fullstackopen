import React from 'react'
import { Form, Button } from 'react-bootstrap'

const Loginform = ({
  setUsername,
  setPassword,
  handleLogin,
  username,
  password
}) => {
  return (
    <div>
      <h2>Login</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username</Form.Label>
          <Form.Control
            id='username'
            type='text'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
          <Form.Label>password</Form.Label>
          <Form.Control
            id='password'
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
          <Button id='login-button' type='submit'>
            login
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default Loginform
