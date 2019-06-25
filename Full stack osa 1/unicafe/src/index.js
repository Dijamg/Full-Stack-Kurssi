import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
      {text}
    </button>
  )

const Statistic = ({text, value}) =>(
    <tr>
        <td>{text}</td>
        <td>{value}</td>
    </tr>
)

const Statistics = ({good,neutral,bad}) =>{
    const votes = good  + neutral + bad
    const sum = good - bad
    const average = sum/votes
    const positive = good/votes * 100
    if(votes !== 0){
        return(
            <div>
                <table>
                    <tbody>
                        <Statistic text = "good" value = {good}/>
                        <Statistic text = "neutral" value = {neutral}/>
                        <Statistic text = "bad" value = {bad}/>
                        <Statistic text = "all" value = {votes}/>
                        <Statistic text = "average" value = {average}/>
                        <Statistic text = "positive" value ={positive + " %"}/>
                    </tbody>
                </table>
            </div>
        )
    }else{
        return(
            <div>
                <p>
                    No feedback given
                </p>
            </div>
        )
    }
}


const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addPositive = () => setGood(good +1)
  const addNeutral = () => setNeutral(neutral+1)
  const addBad = () => setBad(bad + 1)

  return (
    <div>
    <h1>give feedback</h1>
      <Button handleClick = {addPositive} text = 'good'/>
      <Button handleClick = {addNeutral} text = 'neutral'/>
      <Button handleClick = {addBad} text = 'bad'/>
      <h1>statistics</h1>
      <Statistics good = {good} neutral = {neutral} bad= {bad}/>    
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)