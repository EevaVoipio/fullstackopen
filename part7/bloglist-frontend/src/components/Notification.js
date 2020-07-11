import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const content = useSelector((state) => state.notification)
  if (!content) {
    return null
  }
  return (
    <div id='notification' className={content.type}>
      {content.message}
    </div>
  )
}

export default Notification
