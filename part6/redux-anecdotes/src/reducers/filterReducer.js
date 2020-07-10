const initialState = ''

export const setFilter = (filter) => {
  return {
    type: 'SET_FILTER',
    data: filter
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.data
    default:
      return state
  }
}

export default reducer
