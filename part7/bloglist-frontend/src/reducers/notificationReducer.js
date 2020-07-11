const initialState = null
let timeoutId

export const setNotification = (notification, timeout) => {
  return async (dispatch) => {
    clearTimeout(timeoutId)
    dispatch({ type: 'SET_NOTIFICATION', data: notification })
    timeoutId = setTimeout(() => {
      dispatch({ type: 'CLEAR_NOTIFICATION' })
    }, timeout * 1000)
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
