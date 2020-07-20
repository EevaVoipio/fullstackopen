import React from 'react'
import { useSelector } from 'react-redux'

import Blog from './Blog'

const Bloglist = () => {
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  return (
    <div id='bloglist'>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} user={user} />
        ))}
    </div>
  )
}

export default Bloglist
