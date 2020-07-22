import React from 'react'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Bloglist = ({ blogs }) => {
  return (
    <div id='bloglist'>
      <Table striped hover>
        <tbody>
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog key={blog.id} blog={blog} />
            ))}
        </tbody>
      </Table>
    </div>
  )
}

const Blog = ({ blog }) => {
  return (
    <tr>
      <td>
        <Link className='links' to={'/blogs/' + blog.id}>
          {blog.title} by {blog.author}
        </Link>
      </td>
    </tr>
  )
}

export default Bloglist
