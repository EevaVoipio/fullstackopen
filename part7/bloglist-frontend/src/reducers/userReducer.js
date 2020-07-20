import blogService from '../services/blogs'
import loginService from '../services/login'

const initialState = null

export const loginUser = (username, password) => {
  return async (dispatch) => {
    const user = await loginService.login({
      username,
      password
    })

    blogService.setToken(user.token)
    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
    dispatch({ type: 'SET_USER', data: { user } })
    dispatch({ type: 'GET_USER', data: user })
  }
}

export const logoutUser = () => {
  return async (dispatch) => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch({ type: 'CLEAR_USER' })
  }
}

export const getUser = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch({ type: 'GET_USER', data: user })
    } else {
      dispatch({ type: 'GET_USER', data: null })
    }
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.data
    case 'CLEAR_USER':
      return initialState
    case 'GET_USER':
      return action.data
    default:
      return state
  }
}

export default reducer
