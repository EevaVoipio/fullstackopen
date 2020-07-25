import React, { useState } from 'react'

const Books = (props) => {
  const [genre, setGenre] = useState(null)

  if (!props.show) {
    return null
  }

  if (props.bookResult.loading || props.genreResult.loading) {
    return <div>loading...</div>
  }

  const books = props.bookResult.data.allBooks
  const genres = props.genreResult.data.allGenres

  return (
    <div>
      <h2>books</h2>
      {genre && (
        <div>
          in genre <b>{genre}</b>
        </div>
      )}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books
            .filter((book) => (genre ? book.genres.includes(genre) : book))
            .map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
      {genres.map((genre) => (
        <button onClick={() => setGenre(genre)} key={genre}>
          {genre}
        </button>
      ))}
      <button onClick={() => setGenre(null)}>All genres</button>
    </div>
  )
}

export default Books
