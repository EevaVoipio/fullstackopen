import React from 'react'

const Userlist = ({ userList }) => {
  return (
    <div>
      <div className='flex'>
        <div></div>
        <div className='right-flex'>
          <b>blogs created</b>
        </div>
      </div>
      {userList.map((user) => (
        <UserListInfo key={user.id} user={user} />
      ))}
    </div>
  )
}

const UserListInfo = ({ user }) => {
  return (
    <div className='flex'>
      <div>
        <a href={'/users/' + user.id}> {user.name} </a>
      </div>
      <div className='right-flex'>{user.blogs.length}</div>
    </div>
  )
}

export default Userlist
