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
              <tr key={blog.id}>
                <td>
                  <Blog blog={blog} />
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  )
}

const Blog = ({ blog }) => {
  return (
    <div id='blog'>
      <div id='blogtitle'>
        <Link className='links' to={'/blogs/' + blog.id}>
          {blog.title} {blog.author}
        </Link>
      </div>
    </div>
  )
}

export default Bloglist
