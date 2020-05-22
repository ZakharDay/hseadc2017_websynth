import React, { Component } from 'react'
import { ActionCable } from 'react-actioncable-provider'
import Oscillator from '../components/Oscillator'
let unmuteAudio = require('unmute-ios-audio')

export default class SynthContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      oscillators: {}
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
    this.removeSynthFromState = this.removeSynthFromState.bind(this)
    this.startSynth = this.startSynth.bind(this)
    this.stopSynth = this.stopSynth.bind(this)
    this.changeFrequency = this.changeFrequency.bind(this)
    this.handleReceivedOscillator = this.handleReceivedOscillator.bind(this)
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
        data.forEach((oscillator, i) => {
          prepareSynthForRender(oscillator)
        })
      })
  }

  createAudioContext() {
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

  handleCreateSynthClick() {
    let { audioContext, oscillators } = this.state
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

        oscillators = this.state.oscillators

        oscillators[uuid] = {
          id: data.id,
          started: oscillators[uuid].started,
          connected: oscillators[uuid].connected,
          oscillator: oscillators[uuid].oscillator
        }

        this.setState({
          oscillators
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
      oscillators
    })
  }

  prepareSynthForRender(oscillatorData) {
    let { id, uuid, frequency } = oscillatorData
    let { audioContext, oscillators } = this.state
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
      oscillators
    })
  }

  removeSynth(uuid) {
    let { oscillators } = this.state
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
      oscillators
    })
  }

  removeSynthFromState(data) {
    let { uuid } = data

    let { oscillators } = this.state
    let oscillator = oscillators[uuid]

    if (oscillator && oscillator.connected == true) {
      this.stopSynth(uuid)
    }

    delete oscillators[uuid]

    this.setState({
      oscillators
    })
  }

  startSynth(uuid) {
    let { audioContext, oscillators } = this.state
    oscillators[uuid].oscillator.connect(audioContext.destination)

    if (oscillators[uuid].started == false) {
      oscillators[uuid].oscillator.start()
      oscillators[uuid].started = true
    }

    oscillators[uuid].connected = true

    this.setState({
      oscillators
    })
  }

  stopSynth(uuid) {
    let { audioContext, oscillators } = this.state
    oscillators[uuid].oscillator.disconnect(audioContext.destination)
    oscillators[uuid].connected = false

    this.setState({
      oscillators
    })
  }

  changeFrequency(uuid, value) {
    let { oscillators } = this.state
    oscillators[uuid].oscillator.frequency.value = value

    this.setState({
      oscillators
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

  handleReceivedOscillator(data) {
    data = JSON.parse(data)

    if (data.id == undefined) {
      this.removeSynthFromState(data)
    } else {
      this.prepareSynthForRender(data)
    }
  }

  render() {
    const { oscillators } = this.state
    let oscillatorElements = []

    // oscillators.forEach((o, i) => {
    Object.entries(oscillators).forEach(([key, value], i) => {
      // if (i == 0) {
      //   console.log(value)
      // }

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
        <ActionCable
          channel={{ channel: 'OscillatorsChannel' }}
          onReceived={this.handleReceivedOscillator}
        />

        <div onClick={this.handleCreateSynthClick}>+ Create Synth</div>
        <div className="SynthContainer">{oscillatorElements}</div>
      </div>
    )
  }
}
