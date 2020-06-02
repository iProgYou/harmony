import React from 'react';
import Grid from './grid_partial';

export default class BassGrid extends React.Component {
  constructor(props){
    super(props);

    this.instrument = 'bass';
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
        instrument={this.instrument}
        processNote={this.props.processNote}
      />
    )
  }
}