import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
	return(
		<h1>{props.text}</h1>
	)
}

const Button = (props) =>
  <button onClick={props.handleClick}>{props.text}</button>

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const rand = () => {

    const numb = Math.floor(Math.random() * props.anecdotes.length)
    setSelected(numb)
    console.log(numb)
  }
  const init = Array.apply(null, new Array(props.anecdotes.length)).map(Number.prototype.valueOf,0)
  const [points, setPoints] = useState(init)
  const vote = () => {
    const copy = [...points]
    copy[selected] +=1
    setPoints(copy)  
	}
	

	const mostVotedIndex = points.indexOf(Math.max(...points))


  return (
    <div>
			<Header text='Anecdote of the day'/>
      <p>{props.anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <Button handleClick={vote} text='vote'/>
      <Button handleClick={rand} text='next anecdote'/>
      <Header text='Anecdote with most votes'/>
			<p>{props.anecdotes[mostVotedIndex]}</p>
			<p>has {points[mostVotedIndex]} votes</p>
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
