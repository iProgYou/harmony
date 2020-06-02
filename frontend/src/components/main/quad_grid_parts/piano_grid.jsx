import React from 'react';
import Grid from './grid_partial';
import * as Tone from 'tone';

export default class PianoGrid extends React.Component {
  constructor(props){
    super(props);
    
    this.instrument = 'piano'
    this.state = {
      isLoaded: false,
    }
  }

  render(){
    if (!this.state.isLoaded) return null;
    return(
      <Grid 
        isLoaded={ this.state.isLoaded }
        beats={ this.props.beats }
        sampler={ this.sampler }
        instrument={this.state.instrument}
        processNote={this.props.processNote}
      />
    )
  }
}