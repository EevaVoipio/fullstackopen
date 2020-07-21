import React from 'react'
import { Button as BootstrapButton } from 'react-bootstrap'

const Button = ({ handleClick, text }) => {
  return (
    <BootstrapButton
      variant='outline-dark'
      size='sm'
      className='button'
      onClick={handleClick}
    >
      {text}
    </BootstrapButton>
  )
}

export default Button
