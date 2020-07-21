import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

import Button from './Button'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button handleClick={toggleVisibility} text='Create new'></Button>
      </div>
      <div style={showWhenVisible}>{props.children}</div>
    </div>
  )
})

export default Togglable
