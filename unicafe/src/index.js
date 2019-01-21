import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <h1>{props.text}</h1>
  )
}

const Statistic = (props) => {
  return(
    <tr>
      <td>{props.name} </td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  const total = props.good + props.neutral + props.bad
  if(total < 1) {
    return 'Ei yhtään palautetta annettu'
  } else {
    return (
      <div>
        <table>
          <tbody>
            <Statistic name='hyvä' value={props.good}/>
            <Statistic name='neutraali' value={props.neutral}/>
            <Statistic name='huono' value={props.bad}/>
            <Statistic name='yhteensä' value={props.good + props.neutral + props.bad}/>
            <Statistic name='keskiarvo' value={props.mean}/>
            <Statistic name='positiivisia' value={ `${props.pos} %`}/>
          </tbody>
        </table>  
      </div>
    )
  }
  
}

const Button = (props) =>
  <button onClick={props.handleClick}>{props.text}</button>

const App = (props) => {


  const feedback = 'anna palautetta'
  const statistic = 'statistiikka'
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const mean = () => {
    const total = (good + neutral + bad)
    if(total > 0) {
      return (good - bad)/total
    }
    return 0
  }

  const positive = () => {
    const total = (good + neutral + bad)
    if(total > 0) {
      return (good/total) * 100
    }
    return 0
  }

  return (
    <div>
      <Header text={feedback} />
      <Button handleClick={() => setGood(good + 1)} text='hyvä'/>
      <Button handleClick={() => setNeutral(neutral + 1)} text='neutraali'/>
      <Button handleClick={() => setBad(bad + 1)} text='huono'/>
      <Header text={statistic} />
      <Statistics good={good} neutral={neutral} bad={bad} mean={mean()} pos={positive()}/>
      
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)