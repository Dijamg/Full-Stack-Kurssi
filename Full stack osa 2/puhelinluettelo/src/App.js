import React, { useState, useEffect } from 'react'
import personsService from './services/persons'

const Filter = ({value, onChange})=>(
    <>filter shown with: <input value={value} onChange={onChange}/></>
)

const PersonForm = ({onSubmit, newName, onNameChange, newNumber, onNumberChange}) => (
    <form onSubmit={onSubmit}>
        <div>
          name: <input value={newName} onChange ={onNameChange} /><br/>
          number: <input pattern="^[\d\(\)\-+]+$" value={newNumber} onChange ={onNumberChange} />
        </div>  
        <div>   
          <button type="submit">add</button>
        </div>
      </form>
)

const Person =({person, onClick})=>(
    <div>{person.name} {person.number}<button onClick={onClick}>delete</button><br/></div>
)

const SuccessNotification = ({ message, isError }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="success">
      {message}
    </div>
  )
}

const ErrorNotification = ({ message, isError }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}


const App = () => {
    const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ successMessage, setSuccessMessage ] = useState(null)
  const [ errorMessage, setErrorMessage ] = useState(null)

  useEffect(() => {
    personsService
      .getAll()
        .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
  
  const changeNumber = (id) =>{
    const personToBeChanged = persons.find(person => person.id === id)
    const changedPerson = {...personToBeChanged, number: newNumber}

    personsService
      .update(id, changedPerson)
      .then(returnedPerson =>{
        setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
        setSuccessMessage(
          `Changed number of ${personToBeChanged.name}`
        )
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
      .catch(error =>{
        if(error.response.statusText === "Bad Request"){
          setErrorMessage(error.response.data.error)
        }else{
          setErrorMessage(
            `Information of ${personToBeChanged.name} has already been removed from the server`
          )
        }
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }
  
  const deletePerson = (id) =>{
    const name = persons.find(person => person.id === id).name
    if(window.confirm(`Delete ${name}`)){
        personsService.discard(id)
        setPersons( persons.filter(person => person.id !== id))
        setSuccessMessage(
          `Deleted ${name}`
        )
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
    }
  }

  console.log('render', persons.length, 'notes')

  const personsToBeShown = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  const addPerson = (event) =>{
      event.preventDefault()
      const personObject ={
          name: newName,
          number: newNumber,
      } 
      if(persons.map(person => person.name.toLowerCase()).includes(newName.toLowerCase())){
        if(window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)){
          changeNumber((persons.find(person => person.name.toLowerCase() === newName.toLowerCase()).id))
        }
      }else{
        personsService
          .add(personObject)
          .then(responseData => {
              setPersons(persons.concat(responseData))
              setNewName('')
              setNewNumber('')
              setSuccessMessage(
                `Added ${personObject.name}`
              )
              setTimeout(() => {
                setSuccessMessage(null)
              }, 5000)
          })
          .catch(error => {
            setErrorMessage(error.response.data.error)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
            console.log(error.response.data)
          })
      }
  }

  const rows = () =>( 
    personsToBeShown.map(person => <Person person = {person} key ={person.id} onClick ={() => deletePerson(person.id)}/>)
  )

  const handleNameChange = (event) =>{
      console.log(event.target.value)
      setNewName(event.target.value)
  }

  const handleNumberChange = (event) =>{
    console.log(event.target.value)
    setNewNumber(event.target.value)
}
const handleFilterChange = (event) =>{
    console.log(event.target.value)
    setNewFilter(event.target.value)

}


  return (
    <div>
      <h2>Phonebook</h2>

      <SuccessNotification message={successMessage}/>
      <ErrorNotification message={errorMessage}/>

      <Filter value = {newFilter} onChange = {handleFilterChange}/>

      <h3>add a new</h3>

      <PersonForm onSubmit = {addPerson} newName ={newName} onNameChange={handleNameChange} newNumber={newNumber} onNumberChange={handleNumberChange}/>

      <h3>Numbers</h3>

      {rows()}
    </div>
  )

}

export default App