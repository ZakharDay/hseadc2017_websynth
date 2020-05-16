import React, { Component } from 'react'
import Oscillator from '../components/Oscillator'
let unmuteAudio = require('unmute-ios-audio')

let oscillators = {}

export default class SynthContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      oscs: oscillators
    }

    // let a = ['foo', 'bar', 'baz']
    // let o = { foo: 'foo', bar: 'bar', baz: 'baz' }
    //
    // a[0]
    //
    // a.forEach((item, i) => {
    //
    // })
    //
    // Object.entries(o.foo).forEach(([key, value], i) => {
    //
    // })

    this.preloadOscillators = this.preloadOscillators.bind(this)
    this.createAudioContext = this.createAudioContext.bind(this)

    this.handleCreateSynthClick = this.handleCreateSynthClick.bind(this)
    this.prepareSynthForRender = this.prepareSynthForRender.bind(this)

    this.removeSynth = this.removeSynth.bind(this)
    this.startSynth = this.startSynth.bind(this)
    this.stopSynth = this.stopSynth.bind(this)
    this.changeFrequency = this.changeFrequency.bind(this)
  }

  componentDidMount() {
    this.createAudioContext()
    this.preloadOscillators()
    unmuteAudio()
  }

  preloadOscillators() {
    let { prepareSynthForRender } = this

    fetch(`http://localhost:3000/api/oscillators/index.json`)
      .then(response => {
        return response.json()
      })
      .then(data => {
        console.log(data)

        data.forEach((oscillator, i) => {
          prepareSynthForRender(oscillator)
        })
      })
  }

  createAudioContext() {
    // create web audio api context
    let audioContext = new (window.AudioContext || window.webkitAudioContext)()

    this.setState({
      audioContext: audioContext
    })
  }

  // Взаимодейстия с осциллятором
  // V Создать
  // V Удалить
  // V Выключить
  // V Включить
  // V Поменять параметр frequency
  // Поменять параметр type
  // Поменять параметр detune

  // createSynth(oscillatorData) {
  //   let { audioContext, oscillators } = this.state
  //   let oscillator = audioContext.createOscillator()
  //
  //   if (oscillatorData) {
  //     let { id, uuid, frequency } = oscillatorData
  //   }
  //
  //   if (frequency && frequency == undefined) {
  //     frequency = 440
  //   }
  //
  //   oscillator.type = 'square'
  //   oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime)
  //
  //   if (uuid == undefined) {
  //     uuid = this.generateUUID()
  //
  //     fetch(`http://localhost:3000/api/oscillators.json`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({
  //         oscillator: { frequency: frequency, uuid: uuid }
  //       })
  //     })
  //       .then(response => response.json())
  //       .then(data => {
  //         console.log('Success:', data)
  //
  //         oscillators = this.state.oscillators
  //
  //         oscillators[uuid] = {
  //           id: data.id,
  //           started: false,
  //           connected: false,
  //           oscillator
  //         }
  //
  //         this.setState({
  //           oscillators
  //         })
  //       })
  //       .catch(error => {
  //         console.error('Error:', error)
  //       })
  //   }
  //
  //   oscillators[uuid] = {
  //     id: id,
  //     started: false,
  //     connected: false,
  //     oscillator
  //   }
  //
  //   this.setState({
  //     oscillators
  //   })
  // }

  handleCreateSynthClick() {
    let { audioContext } = this.state
    let oscillator = audioContext.createOscillator()
    const frequency = 440
    const uuid = this.generateUUID()
    let id = undefined

    oscillator.type = 'square'
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime)

    fetch(`http://localhost:3000/api/oscillators.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        oscillator: { frequency: frequency, uuid: uuid }
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data)

        oscillators[uuid] = {
          id: data.id,
          started: false,
          connected: false,
          oscillator: oscillators[uuid].oscillator
        }

        this.setState({
          oscs: oscillators
        })
      })
      .catch(error => {
        console.error('Error:', error)
      })

    oscillators[uuid] = {
      id: id,
      started: false,
      connected: false,
      oscillator
    }

    this.setState({
      oscs: oscillators
    })
  }

  prepareSynthForRender(oscillatorData) {
    let { id, uuid, frequency } = oscillatorData
    let { audioContext } = this.state
    let oscillator = audioContext.createOscillator()

    oscillator.type = 'square'
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime)

    oscillators[uuid] = {
      id: id,
      started: false,
      connected: false,
      oscillator
    }

    this.setState({
      oscs: oscillators
    })
  }

  removeSynth(uuid) {
    let oscillator = oscillators[uuid]

    if (oscillator.connected == true) {
      this.stopSynth(uuid)
    }

    fetch(`http://localhost:3000/api/oscillators/${oscillator.id}.json`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      } //,
      // body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data)
      })
      .catch(error => {
        console.error('Error:', error)
      })

    delete oscillators[uuid]

    this.setState({
      oscs: oscillators
    })
  }

  startSynth(uuid) {
    let { audioContext } = this.state
    oscillators[uuid].oscillator.connect(audioContext.destination)

    if (oscillators[uuid].started == false) {
      oscillators[uuid].oscillator.start()
      oscillators[uuid].started = true
    }

    oscillators[uuid].connected = true

    this.setState({
      oscs: oscillators
    })
  }

  stopSynth(uuid) {
    let { audioContext } = this.state
    oscillators[uuid].oscillator.disconnect(audioContext.destination)
    oscillators[uuid].connected = false

    this.setState({
      oscs: oscillators
    })
  }

  changeFrequency(uuid, value) {
    oscillators[uuid].oscillator.frequency.value = value

    this.setState({
      oscs: oscillators
    })
  }

  generateUUID() {
    let array = new Uint32Array(8)
    window.crypto.getRandomValues(array)
    let str = ''
    for (let i = 0; i < array.length; i++) {
      str += (i < 2 || i > 5 ? '' : '-') + array[i].toString(16).slice(-4)
    }
    return str
  }

  render() {
    let oscillatorElements = []

    // oscillators.forEach((o, i) => {
    Object.entries(oscillators).forEach(([key, value], i) => {
      if (i == 0) {
        console.log(value)
      }

      oscillatorElements.push(
        <Oscillator
          id={key}
          connected={value.connected}
          oscillator={value.oscillator}
          removeSynth={this.removeSynth}
          startSynth={this.startSynth}
          stopSynth={this.stopSynth}
          changeFrequency={this.changeFrequency}
          key={i}
        />
      )
    })

    return (
      <div>
        <div onClick={this.handleCreateSynthClick}>+ Create Synth</div>
        <div className="SynthContainer">{oscillatorElements}</div>
      </div>
    )
  }
}
