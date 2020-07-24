import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`
export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author {
        name
      }
      published
    }
  }
`
export const ADD_BOOK = gql`
  mutation createBook(
    $title: String!
    $author: String!
    $year: Int!
    $genres: [String!]!
  ) {
    addBook(title: $title, author: $author, published: $year, genres: $genres) {
      title
      author {
        name
      }
    }
  }
`

export const UPDATE_AUTHOR = gql`
  mutation setBorn($name: String!, $year: Int!) {
    editAuthor(name: $name, setBornTo: $year) {
      name
      born
    }
  }
`
