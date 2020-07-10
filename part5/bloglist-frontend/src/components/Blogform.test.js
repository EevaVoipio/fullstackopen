import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blogform from './Blogform'

test('blog is added with correct content', () => {
  const createBlog = jest.fn()
  const component = render(<Blogform handleCreateBlog={createBlog} />)
  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(title, { target: { value: 'Test blogform' } })
  fireEvent.change(author, { target: { value: 'Test author' } })
  fireEvent.change(url, { target: { value: 'testurl.com' } })
  fireEvent.submit(form)

  expect(createBlog.mock.calls.length).toBe(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Test blogform')
  expect(createBlog.mock.calls[0][0].author).toBe('Test author')
  expect(createBlog.mock.calls[0][0].url).toBe('testurl.com')
})
