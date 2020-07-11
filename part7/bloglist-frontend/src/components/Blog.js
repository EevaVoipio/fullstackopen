import React, { useState } from 'react'
import Button from './Button'
//import blogService from '../services/blogs'

const Blog = ({ blog, handleLikeBlog, handleRemoveBlog, user }) => {
  const [showDetails, setShowDetails] = useState(false)
  const handleSetShowDetails = () => {
    setShowDetails(!showDetails)
  }

  const handleLike = async (event) => {
    event.preventDefault()
    const likes = blog.likes + 1
    const newBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      user: blog.user._id,
      likes: likes
    }
    handleLikeBlog(blog.id, newBlog)
  }

  const handleRemove = async (event) => {
    event.preventDefault()
    handleRemoveBlog(blog.id, blog.title, blog.author)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle} id='blog'>
      {!showDetails && (
        <div id='blogtitle'>
          {blog.title} {blog.author}
          <Button handleClick={handleSetShowDetails} text='view' />
        </div>
      )}
      {showDetails && (
        <div>
          <div id='blogtitle'>
            {blog.title} {blog.author}
            <Button handleClick={handleSetShowDetails} text='hide' />
          </div>
          <div>{blog.url}</div>
          <div id='likes'>
            likes {blog.likes} <Button handleClick={handleLike} text='like' />
          </div>
          <div>{blog.user['name']}</div>
          {user.username === blog.user.username && (
            <Button handleClick={handleRemove} text='remove' />
          )}
        </div>
      )}
    </div>
  )
}

export default Blog
