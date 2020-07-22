import React from 'react'

const UserInfo = ({ user }) => {
  if (!user) {
    return null
  }

  return (
    <div className='info'>
      <h1 className='header'>User: {user.name}</h1>
      <h3 className='user-header'>Added blogs</h3>
      {user.blogs.map((blog) => (
        <p key={blog.id}>{blog.title}</p>
      ))}
    </div>
  )
}

export default UserInfo
