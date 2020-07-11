import anecdoteService from '../services/anecdotes'

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.addAnecdote(asObject(content))
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const vote = (id, anecdote) => {
  return async (dispatch) => {
    await anecdoteService.vote(id, { ...anecdote, votes: anecdote.votes + 1 })
    dispatch({
      type: 'VOTE',
      data: { id }
    })
  }
}

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

const asObject = (content) => {
  return { content: content, votes: 0 }
}

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'VOTE':
      const id = action.data.id
      const initialAnecdote = state.find((anecdote) => anecdote.id === id)
      const updatedAnecdote = {
        ...initialAnecdote,
        votes: initialAnecdote.votes + 1
      }
      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : updatedAnecdote
      )
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export default reducer
