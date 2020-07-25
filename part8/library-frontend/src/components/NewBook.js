import React, { useState } from 'react'
import { useMutation } from '@apollo/client'

import { ADD_BOOK, ALL_BOOKS, ALL_AUTHORS, ALL_GENRES } from '../queries'
import Notification from './Notification'

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [createBook] = useMutation(ADD_BOOK, {
    refetchQueries: [
      { query: ALL_BOOKS, query2: ALL_AUTHORS, query3: ALL_GENRES },
    ],
  })

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    const year = Number(published)
    try {
      await createBook({ variables: { title, author, year, genres } })
    } catch (error) {
      console.log(error)
      setErrorMessage(error.message)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type='button'>
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type='submit'>create book</button>
      </form>
      <Notification message={errorMessage} type={'error'} />
    </div>
  )
}

export default NewBook
