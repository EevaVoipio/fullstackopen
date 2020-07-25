import React, { useState, useEffect } from 'react'
import {
  useMutation,
  useApolloClient,
  useQuery,
  useLazyQuery,
  useSubscription,
} from '@apollo/client'

import Authors from './components/Authors'
import Books from './components/Books'
import Loginform from './components/Loginform'
import NewBook from './components/NewBook'
import Notification from './components/Notification'
import Recommendation from './components/Recommendation'
import {
  LOGIN,
  GET_USER,
  BOOK_ADDED,
  ALL_BOOKS,
  ALL_AUTHORS,
  ALL_GENRES,
  ALL_BOOKS_FOR_GENRE,
} from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [userToken, setUserToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [loginUser] = useMutation(LOGIN)
  const [getUserData, userData] = useLazyQuery(GET_USER)
  //const userGenre = userData?.me?.favoriteGenre
  const [userGenre, setUserGenre] = useState(null)
  const client = useApolloClient()
  const bookResult = useQuery(ALL_BOOKS)
  const genreResult = useQuery(ALL_GENRES)
  const authorResult = useQuery(ALL_AUTHORS)
  const bookForGenreResult = useQuery(ALL_BOOKS_FOR_GENRE, {
    skip: !userGenre,
    variables: { genre: userGenre ? userGenre : '' },
  })

  useEffect(() => {
    const token = localStorage.getItem('loggedLibraryUser')
    if (token) {
      setUserToken(token)
    }
  }, [])

  useEffect(() => {
    if (userData?.data?.me) {
      setUserGenre(userData.data.me.favoriteGenre)
    }
  }, [userData])

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      updateCacheWith(addedBook)
      window.alert(
        `New book ${subscriptionData.data.bookAdded.title} by  ${subscriptionData.data.bookAdded.author.name} added`
      )
    },
  })

  const updateCacheWith = (addedBook) => {
    const includedInBooks = (set, object) =>
      set.map((p) => p.title).includes(object.title)

    const bookDataInStore = client.readQuery({ query: ALL_BOOKS })

    if (!includedInBooks(bookDataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: bookDataInStore.allBooks.concat(addedBook) },
      })
    }

    const includedInBooksForGenre = (set, object) =>
      set.map((p) => p.title).includes(object.title)

    const genreBookDataInStore = client.readQuery({
      query: ALL_BOOKS_FOR_GENRE,
      variables: { genre: userGenre ? userGenre : '' },
    })

    if (
      !includedInBooksForGenre(genreBookDataInStore.allBooks, addedBook) &&
      addedBook.genres.includes(userGenre)
    ) {
      client.writeQuery({
        query: ALL_BOOKS_FOR_GENRE,
        variables: { genre: userGenre ? userGenre : '' },
        data: { allBooks: genreBookDataInStore.allBooks.concat(addedBook) },
      })
    }

    const includedInAuthors = (set, object) =>
      set.map((p) => p.name).includes(object)
    const authorDataInStore = client.readQuery({ query: ALL_AUTHORS })

    if (
      !includedInAuthors(authorDataInStore.allAuthors, addedBook.author.name)
    ) {
      const author = { name: addedBook.author.name, born: '', bookCount: 1 }
      client.writeQuery({
        query: ALL_AUTHORS,
        data: { allAuthors: authorDataInStore.allAuthors.concat(author) },
      })
    } else {
      const author = authorDataInStore.allAuthors.find(
        (a) => a.name === addedBook.author.name
      )
      const updatedAuthor = { ...author, bookCount: author.bookCount + 1 }
      client.writeQuery({
        query: ALL_AUTHORS,
        data: {
          allAuthors: authorDataInStore.allAuthors.map((a) =>
            a.name === author.name ? updatedAuthor : a
          ),
        },
      })
    }

    let newGenres = []
    const includedInGenres = (set, genres) => {
      let included = true
      genres.forEach((genre) => {
        if (!set.includes(genre)) {
          included = false
          if (!newGenres.includes(genre)) {
            newGenres = newGenres.concat(genre)
          }
        }
      })
      return included
    }
    const genreDataInStore = client.readQuery({ query: ALL_GENRES })

    if (!includedInGenres(genreDataInStore.allGenres, addedBook.genres)) {
      client.writeQuery({
        query: ALL_GENRES,
        data: { allGenres: genreDataInStore.allGenres.concat(newGenres) },
      })
    }
  }

  const handleRecommendation = () => {
    getUserData()
    setPage('recommended')
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const userToken = await (
        await loginUser({ variables: { username, password } })
      ).data.login.value
      setUserToken(userToken)
      setUsername('')
      setPassword('')
      localStorage.setItem('loggedLibraryUser', userToken)
      setSuccessMessage('logged in')
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const logout = () => {
    setUserToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if (bookResult.loading || genreResult.loading || authorResult.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <Notification
        message={errorMessage != null ? errorMessage : successMessage}
        type={errorMessage != null ? 'error' : 'success'}
      />
      {userToken === null && (
        <Loginform
          setUsername={setUsername}
          setPassword={setPassword}
          handleLogin={handleLogin}
          username={username}
          password={password}
        />
      )}
      {userToken !== null && (
        <div>
          <div>
            <button onClick={() => setPage('authors')}>authors</button>
            <button onClick={() => setPage('books')}>books</button>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => handleRecommendation()}>recommended</button>
            <button onClick={() => logout()}>logout</button>
          </div>

          <Authors
            show={page === 'authors'}
            authors={authorResult.data.allAuthors}
          />

          <Books
            show={page === 'books'}
            bookResult={bookResult}
            genreResult={genreResult}
          />

          <NewBook show={page === 'add'} />

          <Recommendation
            show={page === 'recommended'}
            genre={userGenre}
            bookResult={bookForGenreResult}
          />
        </div>
      )}
    </div>
  )
}

export default App
