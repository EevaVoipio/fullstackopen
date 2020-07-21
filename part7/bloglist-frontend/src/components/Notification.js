import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const content = useSelector((state) => state.notification)
  if (!content) {
    return null
  }
  return <Alert variant={content.type}>{content.message}</Alert>
}

export default Notification
