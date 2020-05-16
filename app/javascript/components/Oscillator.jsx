import _ from 'lodash'
import React from 'react'
import Slider from './Slider'

export default class Oscillator extends React.Component {
  constructor(props) {
    super(props)
    this.changeFrequency = this.changeFrequency.bind(this)
  }

  changeFrequency(value) {
    let { id, changeFrequency } = this.props
    changeFrequency(id, value)
  }

  render() {
    let {
      id,
      connected,
      oscillator,
      removeSynth,
      startSynth,
      stopSynth,
      changeFrequency
    } = this.props

    return (
      <div className="Oscillator">
        {id}
        <br />
        {oscillator.frequency.value}
        <div onClick={() => removeSynth(id)}>- Remove Synth</div>
        <br />

        <div
          onClick={
            connected == true ? () => stopSynth(id) : () => startSynth(id)
          }
        >
          Toggle Synth
        </div>
        <br />

        <Slider
          min="0"
          max="1000"
          currentValue={oscillator.frequency.value}
          changeFrequency={this.changeFrequency}
        />
      </div>
    )
  }
}
