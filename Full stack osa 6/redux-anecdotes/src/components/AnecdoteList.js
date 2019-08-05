import React from 'react'

import { voteAnecdote } from '../reducers/anecdoteReducer'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteList = (props) => {
    const vote = (id) => {
        const current = props.anecdotesToShow.find(n => n.id === id)
        const newObject = {
          content: current.content,
          id: current.id,
          votes: current.votes + 1 
        }
        props.voteAnecdote(newObject, id)
        
        props.setNotification(`you voted '${current.content}'`, 5)
      }

      return (
        <div>
          {props.anecdotesToShow.map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id)}>vote</button>
              </div>
            </div>
          )}
        </div>
      )
}   

const anecdotesToShow = ({anecdotes, filter}) => {
  const filtered = anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
  return filtered.sort((a,b) => b.votes - a.votes)
}

  const mapStateToProps = (state) => {
    // joskus on hyödyllistä tulostaa mapStateToProps:ista...
    console.log(state)
    return {
      anecdotesToShow: anecdotesToShow(state)
    }
  }

const mapDispatchToProps = {
  voteAnecdote,
  setNotification
}

const ConnectedAnecdotes = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)
export default ConnectedAnecdotes