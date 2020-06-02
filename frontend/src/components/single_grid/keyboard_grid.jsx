import React from 'react';
import Grid from './grid_partial';
import * as Tone from 'tone';
import styles from './grid.module.css'
import A1 from "../../notes/keyboard_a_pentatonic/A1.mp3";
import B1 from "../../notes/keyboard_a_pentatonic/B1.mp3";
import Cs2 from "../../notes/keyboard_a_pentatonic/Cs2.mp3";
import E2 from "../../notes/keyboard_a_pentatonic/E2.mp3";
import Fs2 from "../../notes/keyboard_a_pentatonic/Fs2.mp3";
import A2 from "../../notes/keyboard_a_pentatonic/A2.mp3";

export default class KeyboardGrid extends React.Component {
  constructor(props){
    super(props);
    this.instrument = 'keyboard'
    this.state = {
      isLoaded: false,
      
    }

    this.sampler = new Tone.Sampler(
      { A1, B1, "C#2": Cs2, E2, "F#2": Fs2, A2 },
      {
        onload: () => {
          this.setState({ isLoaded: true });
        }
      }
    ).toMaster();

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