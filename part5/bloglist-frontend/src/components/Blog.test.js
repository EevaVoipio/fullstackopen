import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('Blog is shown correctly', () => {
  let blog
  const user = {
    username: 'Username'
  }
  beforeEach(() => {
    blog = {
      title: 'My test blog',
      author: 'My test author',
      url: 'mytestblog.fi',
      likes: 15,
      user: {
        id: '25767',
        username: 'Username'
      }
    }
  })

  test('renders title and author, but not url and likes', () => {
    const component = render(<Blog blog={blog} />)

    expect(component.container).toHaveTextContent('My test blog')
    expect(component.container).toHaveTextContent('My test author')
    expect(component.container).not.toHaveTextContent('mytestblog.fi')
    expect(component.container).not.toHaveTextContent('likes')
  })

  test('renders title and author and also url and likes when view button has been clicked', () => {
    const component = render(<Blog blog={blog} user={user} />)
    // const mockHandler = jest.fn()
    //const { getByText } = render(<Blog blog={blog} user={user} />)
    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent('My test blog')
    expect(component.container).toHaveTextContent('My test author')
    expect(component.container).toHaveTextContent('mytestblog.fi')
    expect(component.container).toHaveTextContent('likes')
  })

  test('clicking likes twice calls event handler twice', () => {
    const mockLikeHandler = jest.fn()
    const mockUpdateHandler = jest.fn()
    const component = render(
      <Blog
        blog={blog}
        user={user}
        handleLikeBlog={mockLikeHandler}
        setUpdate={mockUpdateHandler}
      />
    )
    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)
    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockLikeHandler.mock.calls.length).toBe(2)
  })
})
