import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Person from './components/Person'
import Filter from './components/Filter'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '040-123456',
      id: 1
    }
  ]) 
  const [ newName, setNewName ] = useState('uusi nimi')
  const [ newNumber, setNewNumber] = useState('0')
  const [ newCriteria, setNewCriteria] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const noteObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    if(persons.find(person => person.name === newName)) {
      window.alert(`${newName} on jo luettelossa`)
    } else {
      setPersons(persons.concat(noteObject))
      setNewName('')
      setNewNumber('')
    }
    
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleCompareNames = (event) => {
    setNewCriteria(event.target.value)
  }

  const personsToShow = !newCriteria
    ? persons
    : persons.filter(person => person.name.toUpperCase().includes(newCriteria.toUpperCase()))

  const rows = () => personsToShow.map(person => 
    <Person
      key={person.id}
      person={person}
      />
    )

  return (
    <div>
      <h2>Puhelinluettelo</h2>
        <Filter value={newCriteria} onChange={handleCompareNames}/>
        {/* <div>rajaa näytettäviä: <input value={newCriteria} onChange={handleCompareNames}/></div> */}
        {<div>
          <form onSubmit={addPerson}>
           <div>nimi: <input value={newName}
            onChange={handleNameChange}
            /></div>
            <div>numero: <input value={newNumber} onChange={handleNumberChange} /></div>
            <button type="submit">lisää</button>
          </form>
        </div>}
      <h2>Numerot</h2>
      {rows()}
    </div>
  )

}

export default App
