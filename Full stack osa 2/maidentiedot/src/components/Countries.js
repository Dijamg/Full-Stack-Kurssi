import React, { useState, useEffect } from 'react'
import axios from 'axios'

//Info of single country.
const CountryInfo = ({country, allCountries}) =>{
    const [currentWeather, setCurrentWeather] = useState('')
    const [imgUrl, setImgUrl] = useState('')
    //Get info about the chosen country.
    const info = allCountries.filter(a => a.name.toLowerCase() === country.toLowerCase())[0]
    //GET the info about current weather.
    const hook = () =>{
        WeatherInfo(info.capital)
        .then(response => {
            setCurrentWeather(response.data.current)
            setImgUrl(response.data.current.condition.icon)
        })
            
    }
    useEffect(hook, [])

    return(
        <div>
            <h1>{country}</h1>
            capital {info.capital}<br/>
            population {info.population}
            
            <h2>Languages</h2>
            <ul>{info.languages.map(language => <li key={language.name}>{language.name}</li>)}</ul>
            <img 
                src={info.flag}
                alt ="flag" 
                height="90px"
                width="150px" />
            <h2>Weather in {info.capital}</h2>   
            <b>temperature: </b>{currentWeather.temp_c} Celcius<br/>
             <img
                src={imgUrl}
                alt="condition"
             /><br/>
            <b>wind: </b>{currentWeather.wind_kph} kph direction {currentWeather.wind_dir}

        </div>
    )
}


function WeatherInfo(city){ 
    const url = 'https://api.apixu.com/v1/forecast.json?key=fa03fe689d3241ba9c2102438190307&q='.concat(city)
   return( 
        axios
            .get(url)    
   )  
}

//List of countries
const Countries = ({listOfCountries, allCountries, setCountries}) =>{

    const size = listOfCountries.length

    if(size === 1){
        return(<CountryInfo country={listOfCountries[0]} allCountries={allCountries}/>)
    }else if(size >= 10){
        return(<div>Too many matches, specify another filter</div>)
    }else{ 
        return(listOfCountries.map(country => <div key={country}>{country}<button onClick={() => setCountries([].concat(country))}>show</button></div>))
    }
  
}

export default Countries