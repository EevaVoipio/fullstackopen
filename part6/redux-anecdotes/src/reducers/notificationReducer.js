const initialState = null

export const setNotification = (notification, timeout) => {
  return async (dispatch) => {
    dispatch({ type: 'SET_NOTIFICATION', data: notification })
    setTimeout(() => {
      dispatch({ type: 'CLEAR_NOTIFICATION' })
    }, timeout * 1000)
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION'
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data
    case 'CLEAR_NOTIFICATION':
      return initialState
    default:
      return state
  }
}

export default reducer
