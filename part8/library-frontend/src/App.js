import React, { useState, useEffect } from 'react'
import {
  useMutation,
  useApolloClient,
  useQuery,
  useLazyQuery,
} from '@apollo/client'

import Authors from './components/Authors'
import Books from './components/Books'
import Loginform from './components/Loginform'
import NewBook from './components/NewBook'
import Notification from './components/Notification'
import Recommendation from './components/Recommendation'
import { LOGIN, GET_USER } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [userToken, setUserToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [loginUser] = useMutation(LOGIN)
  const userData = useQuery(GET_USER)
  const userGenre = userData?.me?.favoriteGenre
  const client = useApolloClient()

  useEffect(() => {
    const token = localStorage.getItem('loggedLibraryUser')
    if (token) {
      setUserToken(token)
    }
  }, [])

  const handleRecommendation = () => {
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

          <Authors show={page === 'authors'} />

          <Books show={page === 'books'} />

          <NewBook show={page === 'add'} />

          <Recommendation show={page === 'recommended'} genre={userGenre} />
        </div>
      )}
    </div>
  )
}

export default App
