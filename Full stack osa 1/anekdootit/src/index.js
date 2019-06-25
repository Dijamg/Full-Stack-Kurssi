import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick, text}) =>{
    return(
            <button onClick = {handleClick}>
                {text}
            </button>
    )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [allVotes, setVotes] =useState(Array.apply(null, {length: anecdotes.length}).map(() => 0))
  const indexOfMax = allVotes.indexOf(Math.max.apply(Math, allVotes))

  const handleVote = () => {
      const copy = [...allVotes]
      copy[selected] += 1
      setVotes(copy)
  }
  
  const nextAnectode = () => {
    const index = Math.floor(Math.random()*6)
    setSelected(index)
    console.log(index)
  }

  return (
    <div>
      <h1>Anectode of the day</h1>
      {props.anecdotes[selected]}<br/>
      has {allVotes[selected]} votes<br/>
      <Button handleClick = {handleVote} text ="vote"/>  
      <Button handleClick = {nextAnectode} text ="next anectode"/>
      <h1>Anectode with the most votes</h1>
      {props.anecdotes[indexOfMax]}<br/>
      has {allVotes[indexOfMax]} votes
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)