// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'

function callServer(id) {
  fetch(`http://localhost:3000/api/fxes/${id}.json`)
    .then(response => {
      return response.json()
    })
    .then(data => {
      console.log(data)
    })
}

function analyseTemperature(e) {
  console.log(e)

  let data = {
    city: e.target.value
  }

  fetch('http://localhost:3000/api/temperature_analyser/analyse', {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data)
    })
    .catch(error => {
      console.error('Error:', error)
    })
}

function analyseTemperatureFromButton(city) {
  let data = {
    city: city
  }

  fetch('http://localhost:3000/api/temperature_analyser/analyse', {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data)
    })
    .catch(error => {
      console.error('Error:', error)
    })
}

const Fx = props => {
  console.log(props)

  return (
    <div>
      <div onClick={() => callServer(props.id)}>{props.name}</div>
    </div>
  )
}

const Rack = props => {
  // let fxElements = []

  let fxElements = props.fxes.map(function(fx, i) {
    return <Fx {...fx} key={i} />
  })

  return (
    <div>
      <div>{fxElements}</div>
      <input onChange={analyseTemperature} />

      <button onClick={() => analyseTemperatureFromButton('sanfrancisco')}>
        San Francisco
      </button>

      <button onClick={() => analyseTemperatureFromButton('nyc')}>
        New York City
      </button>
    </div>
  )
}

document.addEventListener('DOMContentLoaded', () => {
  let props = document.getElementsByTagName('div')[0].dataset.props
  let testContent = JSON.parse(props)

  ReactDOM.render(
    <Rack fxes={testContent} />,
    document.body.appendChild(document.createElement('div'))
  )
})
