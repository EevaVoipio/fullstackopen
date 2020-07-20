import React from 'react'
import { Link } from 'react-router-dom'

import Button from './Button'

const Menu = ({ user, handleLogout }) => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div className='menu'>
      <Link style={padding} to='/'>
        blogs
      </Link>
      <Link style={padding} to='/users'>
        users
      </Link>
      {user.name} logged in <Button handleClick={handleLogout} text='logout' />
    </div>
  )
}

export default Menu
