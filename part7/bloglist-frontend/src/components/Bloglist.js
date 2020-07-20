import React from 'react'

const Bloglist = ({ blogs, user }) => {
  return (
    <div id='bloglist'>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
    </div>
  )
}

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle} id='blog'>
      <div id='blogtitle'>
        <a href={'/blogs/' + blog.id}>
          {blog.title} {blog.author}
        </a>
      </div>
    </div>
  )
}

export default Bloglist
