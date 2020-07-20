import blogService from '../services/blogs'
const baseUrl = '/api/users'

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await blogService.getAll(baseUrl)
    dispatch({
      type: 'INIT_USERS',
      data: users
    })
  }
}
const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_USERS':
      return action.data
    default:
      return state
  }
}

export default reducer
