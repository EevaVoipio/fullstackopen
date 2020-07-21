import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'

import Button from './Button'

const Menu = ({ user, handleLogout }) => {
  return (
    <Navbar collapseOnSelect expand='md' variant='light'>
      <Navbar.Brand href='/'>
        <span className='menu'>
          <h3>Blog app</h3>
        </span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls='responsive-navbar-nav' />
      <Navbar.Collapse id='responsive-navbar-nav'>
        <Nav className='mr-auto'>
          <Nav.Link href='#' as='span'>
            <Link className='menu' to='/'>
              Blogs
            </Link>
          </Nav.Link>
          <Nav.Link href='#' as='span'>
            <Link className='menu' to='/users'>
              Users
            </Link>
          </Nav.Link>
          <span className='menu'>{user.name} logged in </span>
          <Button handleClick={handleLogout} text='logout' />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Menu
