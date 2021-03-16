import React, { useState, useEffect } from 'react'
import Filter from './componets/Filter'
import PersonForm from './componets/PersonForm'
import Persons from './componets/Persons'
import personService from './services/persons'
import MessageInfo from './componets/MessageInfo'

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNumber] = useState('')
  const [query, setQuery] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState(false)

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response)
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
      if (window.confirm(`${newName} is alredy added to phonebook, replace the old number with a new one?`)) {
        updatePersonNumber(newName)
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      }

      personService
        .createPerson(newPerson)
        .then(response => {
          setPersons(persons.concat(response))
          setMessage(`Added ${newPerson.name}`)
          setTimeout(() => {
            setMessage('')
          }, 5000)
        })
        .catch(error => {
          setMessage(`Information of ${newPerson.name} has alredy been removed from server.`)
          setError(true)
          setTimeout(() => {
            setMessage('')
            setError(false)
          }, 5000);
        })
    }

    setNewName('')
    setNumber('')
  }


  const deletePersonId = person => {
    if (window.confirm(`Delete ${person.name}?`)) {

      personService
        .deletePerson(person.id)
        .then(response => {
          const newPersons = persons.filter(p => p.id != person.id)
          setMessage(`Deleted ${person.name}`)
          setPersons(newPersons)
          setTimeout(() => {
            setMessage('')
          }, 5000)
        })
        .catch(error => {
          setMessage(`Information of ${person.name} has alredy been removed from server.`)
          setError(true)
          setTimeout(() => {
            setMessage('')
            setError(false)
          }, 5000);
        })
    }

  }

  const updatePersonNumber = (name) => {
    const person = persons.find(p => p.name === name)
    const updateObj = { ...person, number: newNumber }
    personService
      .modifyPerson(updateObj)
      .then(response => {
        setPersons(persons.map(p => p.id !== updateObj.id ? p : response))
        setMessage(`Updated ${name}`)
        setTimeout(() => {
          setMessage('')
        }, 5000)
      })
      .catch(error => {
        setMessage(`Information of ${person.name} has alredy been removed from server.`)
        setError(true)
        setTimeout(() => {
          setMessage('')
          setError(false)
        }, 5000);
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      {message && <MessageInfo message={message} error={error} />}
      <Filter query={query} handleQuery={handleQuery} />
      <form>
        <h2>add a new</h2>
        <PersonForm newName={newName} handleNames={handleNames} newNumber={newNumber} handleNumbers={handleNumbers} addPerson={addPerson} />
      </form>
      <h2>Numbers</h2>
      <Persons filterPersons={filterPersons} deletePersonId={deletePersonId} />

    </div>
  )
}

export default App