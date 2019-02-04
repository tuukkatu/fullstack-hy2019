import React from 'react';
import ReactDOM from 'react-dom';

const Course = ({course}) => {
    return (
      <div>
        <Header name='Opetusohjelma' />
        <Header name={course.name}/>
        <Content parts={course.parts}/>
      </div>
    )
  }

  const Header = ({ name }) => {
    return (
      <h1>{name}</h1>
    )
  }
  
  
  const Part = ({ part }) => {
    return (
      <div>
        {part.name} {part.exercises}
      </div>
    )
  }
  
  const Content = ({ parts }) => {
    const rows = () => parts.map(part =>
      <Part key={part.id} part={part}/>
      )
    return (
      <div>
        {rows()}
        <Total parts={parts}/>
      </div>
    )
  }
  
  const Total = ({ parts }) => {
    const sum = parts.reduce((acc, currVal) => {
      return acc + currVal.exercises
    }, 0)
    return (
      <div>
        <p>yhteensä {sum}</p>
      </div>
    )
  }

  export default Course