import React from 'react'

const Recommendation = (props) => {
  const genre = props.genre

  if (!props.show) {
    return null
  }

  if (!props.bookResult.data) {
    return <div>loading...</div>
  }

  const books = props.bookResult.data.allBooks

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
