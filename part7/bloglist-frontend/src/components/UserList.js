import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initializeUsers } from '../reducers/userListReducer'

const Userlist = () => {
  const dispatch = useDispatch()
  const userList = useSelector((state) => state.userList)
  //Duplicate here as I need it in App, but am having trouble getting it to update user blogs correctly

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])
  return (
    <div>
      <div className='flex'>
        <div>
          <b>User</b>
        </div>
        <div className='right-flex'>
          <b>Number of added blogs</b>
        </div>
      </div>
      {userList.map((user) => (
        <User key={user.id} user={user} />
      ))}
    </div>
  )
}

const User = ({ user }) => {
  return (
    <div className='flex'>
      <div>
        <a className='links' href={'/users/' + user.id}>
          {' '}
          {user.name}{' '}
        </a>
      </div>
      <div className='right-flex'>{user.blogs.length}</div>
    </div>
  )
}

export default Userlist
