import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

const Userlist = () => {
  const userList = useSelector((state) => state.userList)
  return (
    <div>
      <div className='flex'>
        <div></div>
        <div className='right-flex'>
          <b>blogs created</b>
        </div>
      </div>
      {userList.map((user) => (
        <UserInfo key={user.id} user={user} />
      ))}
    </div>
  )
}

const UserInfo = ({ user }) => {
  return (
    <div className='flex'>
      <div>{user.name}</div>
      <div className='right-flex'>{user.blogs.length}</div>
    </div>
  )
}

export default Userlist
