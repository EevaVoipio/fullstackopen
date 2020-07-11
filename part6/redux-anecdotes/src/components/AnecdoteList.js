import React from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import Anecdote from './Anecdote'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector((state) => state.anecdotes)
  const filter = useSelector((state) => state.filter)
  return anecdotes
    .filter((anecdote) =>
      anecdote.content.toLowerCase().includes(filter.toLowerCase())
    )
    .sort((a, b) => b.votes - a.votes)
    .map((anecdote) => (
      <div key={anecdote.id}>
        <Anecdote
          anecdote={anecdote}
          handleClick={() => {
            dispatch(vote(anecdote.id, anecdote))
            dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
          }}
        />
      </div>
    ))
}

export default AnecdoteList
