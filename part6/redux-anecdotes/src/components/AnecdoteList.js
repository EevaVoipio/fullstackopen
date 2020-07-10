import React from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { createAnecdote, vote } from '../reducers/anecdoteReducer'
import Anecdote from './Anecdote'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector((state) => state)
  return anecdotes
    .sort((a, b) => b.votes - a.votes)
    .map((anecdote) => (
      <div key={anecdote.id}>
        <Anecdote
          anecdote={anecdote}
          handleClick={() => dispatch(vote(anecdote.id))}
        />
      </div>
    ))
}

export default AnecdoteList
