
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries'


const App = () => {
    const [ newName, setNewName ] = useState('')
    const [ countries, setCountries] = useState([])
    const [allCountries, setAllCountries] = useState([])

    const handleNameChange = (event) =>{
        console.log(event.target.value)
        setNewName(event.target.value)
        setCountries(allCountries.map(country => country.name).filter(name => name.toLowerCase().includes(event.target.value.toLowerCase())))
    }

    const hook = () => {
        console.log('effect')
        axios
          .get('https://restcountries.eu/rest/v2/all')
          .then(response => {
            console.log('promise fulfilled')
            setAllCountries(response.data)
          })
      }
      
      
      useEffect(hook, [])

    return(
        <div>
            find countries <input value={newName} onChange={handleNameChange}/>
            <Countries listOfCountries={countries} allCountries={allCountries} setCountries={setCountries}/>
        </div>
    )

}

export default App