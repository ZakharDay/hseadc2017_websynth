import React, { Component } from 'react'
import City from '../components/City'

export default class WeatherContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      error: '',
      cities: [],
      autocomplete_cities: [],
      test: {
        a: 1,
        b: {
          b1: 1,
          b2: 2
        },
        c: 3
      }
    }

    this.cityInput = React.createRef()

    this.handleInputChange = this.handleInputChange.bind(this)
    this.getCities = this.getCities.bind(this)
    this.getWeatherFromInput = this.getWeatherFromInput.bind(this)
    this.getWeather = this.getWeather.bind(this)
    this.getWeatherFromInput = this.getWeatherFromInput.bind(this)
    this.saveWeatherData = this.saveWeatherData.bind(this)
    this.showError = this.showError.bind(this)
    this.eraseError = this.eraseError.bind(this)
    this.mutateState = this.mutateState.bind(this)
  }

  handleInputChange() {
    this.eraseError()
    this.getCities(this.cityInput.current.value)
  }

  getCities(search) {
    fetch(
      `http://localhost:3000/api/temperature_analyser/find_cities.json?search=${search}`
    )
      .then(response => {
        return response.json()
      })
      .then(data => {
        console.log(data)

        this.setState({ autocomplete_cities: data })
      })
  }

  getWeatherFromInput() {
    this.getWeather(this.cityInput.current.value)
  }

  getWeather(city) {
    fetch(`http://localhost:3000/api/temperature_analyser/analyse/${city}.json`)
      .then(response => {
        return response.json()
      })
      .then(data => {
        console.log(data)

        if (data.data) {
          this.saveWeatherData(data)
        } else {
          this.showError(data)
        }
      })
  }

  saveWeatherData(data) {
    let cities = this.state.cities

    cities.push({
      name: data.data[0].city_name,
      temp: data.data[0].app_temp
    })

    this.setState({
      cities: cities
    })
  }

  showError(data) {
    this.setState({
      error: data.error
    })
  }

  eraseError() {
    this.setState({
      error: ''
    })
  }

  mutateState() {
    // let { test } = this.state
    // test.b.b1 = 9

    this.setState({
      test: {
        a: this.state.test.a,
        b: {
          b1: this.state.test.b.b1,
          b2: 9
        },
        c: this.state.test.c
      }
    })
  }

  render() {
    let { error, cities, autocomplete_cities } = this.state

    let cityElements = cities.map(function(city, i) {
      return <City {...city} key={i} />
    })

    let autocompleteCityElements = autocomplete_cities.map((city, i) => {
      return (
        <li onClick={() => this.getWeather(city.name)} key={i}>
          {city.name}
        </li>
      )
    })

    let errorElement = <p className="error">{error}</p>

    return (
      <div className="WeatherContainer">
        <div>{this.state.test.a}</div>
        <div>{this.state.test.b.b1}</div>
        <div>{this.state.test.b.b2}</div>
        <div>{this.state.test.c}</div>
        <br />
        <div onClick={this.mutateState}>Mutate State</div>

        <input ref={this.cityInput} onChange={this.handleInputChange} />

        <ul>{autocompleteCityElements}</ul>

        <button onClick={this.getWeatherFromInput}>Get Weather</button>
        {error != '' ? errorElement : ''}

        <br />

        <button onClick={() => this.getWeather('sanfrancisco')}>
          San Francisco
        </button>

        <button onClick={() => this.getWeather('nyc')}>New York City</button>

        {cityElements}
      </div>
    )
  }
}
