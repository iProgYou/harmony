import React from 'react';
import Grid from './grid_partial';
import * as Tone from 'tone';
import styles from './grid.module.css'

export default class KeyboardGrid extends React.Component {
  constructor(props){
    super(props);
    this.instrument = 'keyboard'
    this.state = {
      isLoaded: false,
    }
  }
  
  render(){
    if (!this.state.isLoaded) return null;
    return(
      <div className={styles.homePageGrid}>
        <Grid 
          isLoaded={ this.state.isLoaded }
          beats={ this.props.beats }
          sampler={ this.sampler }
          instrument={this.instrument}
          processNote={this.props.processNote}
          />
      </div>
      
    )
  }
}