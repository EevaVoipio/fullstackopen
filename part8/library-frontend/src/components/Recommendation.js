import React from 'react'
import { useQuery } from '@apollo/client'

import { ALL_BOOKS_FOR_GENRE } from '../queries'

const Recommendation = (props) => {
  const genre = props.genre

  const bookResult = useQuery(ALL_BOOKS_FOR_GENRE, {
    skip: !genre,
    variables: { genre: genre ? genre : '' },
  })

  if (!props.show) {
    return null
  }

  if (!bookResult.data) {
    return <div>loading...</div>
  }

  const books = bookResult.data.allBooks

  return (
    <div>
      {books && (
        <div>
          <h1>Recommendations</h1>
          <p>
            Books in your favorite genre <b>{genre}</b>
          </p>
          <table>
            <tbody>
              <tr>
                <th></th>
                <th>author</th>
                <th>published</th>
              </tr>
              {books.map((a) => (
                <tr key={a.title}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default Recommendation
