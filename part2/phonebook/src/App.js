import React, { useState, useEffect } from 'react'
import Filter from './componets/Filter'
import PersonForm from './componets/PersonForm'
import Persons from './componets/Persons'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNumber] = useState('')
  const [query, setQuery] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })

  }, [])

  let filterPersons = persons.filter(p => p.name.toLowerCase().search(query.toLowerCase()) > -1
  )

  const handleQuery = (e) => {
    setQuery(e.target.value)
  }

  const handleNames = (e) => {
    setNewName(e.target.value)
  }

  const handleNumbers = (e) => {
    setNumber(e.target.value)
  }

  const addPerson = (e) => {
    e.preventDefault()

    if (persons.find(person => newName.toLowerCase() === person.name.toLowerCase())) {
      alert(`${newName} is alredy added to phonebook`)
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(newPerson))
    }

    setNewName('')
    setNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter query={query} handleQuery={handleQuery} />
      <form>
        <h2>add a new</h2>
        <PersonForm newName={newName} handleNames={handleNames} newNumber={newNumber} handleNumbers={handleNumbers} addPerson={addPerson} />
      </form>
      <h2>Numbers</h2>
      <Persons filterPersons={filterPersons} />

    </div>
  )
}

export default App