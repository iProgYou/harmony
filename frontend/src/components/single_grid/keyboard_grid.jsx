import React from 'react';
import Grid from './grid';
import * as Tone from 'tone';

import A1 from "../../notes/keyboard_a_pentatonic/A1.mp3";
import B1 from "../../notes/keyboard_a_pentatonic/B1.mp3";
import Cs2 from "../../notes/keyboard_a_pentatonic/Cs2.mp3";
import E2 from "../../notes/keyboard_a_pentatonic/E2.mp3";
import Fs2 from "../../notes/keyboard_a_pentatonic/Fs2.mp3";
import A2 from "../../notes/keyboard_a_pentatonic/A2.mp3";

export default class KeyboardGrid extends React.Component {
  constructor(props){
    super(props);

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

      <Grid 
        isLoaded={ this.state.isLoaded }
        cols={ 8 }
        sampler={ this.sampler }
      />
      
    )
  }

}