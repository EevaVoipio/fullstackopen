const initialState = null

export const setNotification = (notification) => {
  return {
    type: 'SET_NOTIFICATION',
    data: notification
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
