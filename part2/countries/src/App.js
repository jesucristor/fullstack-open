import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css';

// necesito obtener los datos de los paises
// necesito filtrar esos datos obtenidos segun la cantidad de paises pedidos
// al tener el pais requerido mostrar sus datos
// ademas de mostrar sus datos, necesito obtener datos del clima de ese pais
// al tener sus datos , los muestro con los otros datos ya mostrados

const RenderNoCountries = () => <div>Too many matches, specify another filter</div>
const RenderTenCountries = ({ filterCountries, handleSelectedCountry }) => {
  return (
    <div>
      {filterCountries.map(c => <div key={c.alpha2Code}>{c.name}<button name={c.name} onClick={handleSelectedCountry}>show</button></div>)}
    </div>
  )
}
const RenderCountry = ({ country }) => {
  return (
    <div>
      <h1>{country.name}</h1>
      <br />
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <h2>languages</h2>
      {country.languages.map(lang => <li key={lang.iso639_1}>{lang.name}</li>)}
      <br />
      <img style={{ height: '150px', width: "150px" }} src={country.flag} />
    </div>
  )
}

const RenderWeather = ({ weather }) => {
  return (
    <div>
      <h2>Weather in {weather.location.name}</h2>
      <div><strong>temperature:</strong>{weather.current.temperature} Celcius</div>
      <img style={{ height: '50px', width: '50px' }} src={weather.current.weather_icons} />
      <div><strong>wind:</strong> {weather.current.wind_speed} mph direction {weather.current.wind_dir}</div>
    </div>
  )
}

const ShowCountry = ({ country, weather }) => {
  console.log(weather);
  return (
    <div>
      <RenderCountry country={country} />
      <RenderWeather weather={weather} />
    </div>
  )
}

function App() {
  const [countries, setCountries] = useState([])
  const [input, setInput] = useState('')

  const [weather, setWeather] = useState(null)

  console.log(Boolean(weather));

  let query

  useEffect(() => {

    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])


  const handleInput = (e) => {
    setInput(e.target.value)
    console.log(e.target.value);
  }

  const searchCountry = () => {
    console.log('estoy en la funcion');
    let filterCountries = countries.filter(c => c.name.toLowerCase().search(input.toLowerCase()) >= 0)

    if (filterCountries.length > 10) {
      return <RenderNoCountries />
    }

    if (filterCountries.length <= 10 && filterCountries.length != 1) {
      return <RenderTenCountries filterCountries={filterCountries} handleSelectedCountry={handleSelectedCountry} />
    }

    if (filterCountries.length === 1) {
      console.log('lo encontre');
      query = filterCountries[0].name
      if (weather) {

        return <ShowCountry country={filterCountries[0]} weather={weather} />
      }
    }
  }


  const handleSelectedCountry = (e) => {
    setInput(e.target.name.toLowerCase())
  }


  useEffect(() => {
    // searchCountry()

    if (query) {
      console.log('entre');
      const api_key = process.env.REACT_APP_API_KEY
      axios
        .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${query}`)
        .then(response => {
          setWeather(response.data)
          console.log(response.data);
        })
    }
  }, [input]
  )




  console.log('renderizando la app')

  return (
    <div>
      find countries <input value={input} onChange={handleInput} />

      {input && searchCountry()}

    </div>
  );
}

export default App;
