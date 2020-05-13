import React from 'react';
import Grid from '../single_grid/grid_partial';
import MiniGrid from './mini_grid';

// bass
import bA1 from "../../notes/bass_a_pentatonic/A1.mp3";
import bB1 from "../../notes/bass_a_pentatonic/B1.mp3";
import bCs2 from "../../notes/bass_a_pentatonic/Cs2.mp3";
import bE2 from "../../notes/bass_a_pentatonic/E2.mp3";
import bFs2 from "../../notes/bass_a_pentatonic/Fs2.mp3";
import bA2 from "../../notes/bass_a_pentatonic/A2.mp3";
// piano
import pA1 from "../../notes/piano_a_pentatonic/A1.mp3";
import pB1 from "../../notes/piano_a_pentatonic/B1.mp3";
import pCs2 from "../../notes/piano_a_pentatonic/Cs2.mp3";
import pE2 from "../../notes/piano_a_pentatonic/E2.mp3";
import pFs2 from "../../notes/piano_a_pentatonic/Fs2.mp3";
import pA2 from "../../notes/piano_a_pentatonic/A2.mp3";
// keyboard
import kA1 from "../../notes/keyboard_a_pentatonic/A1.mp3";
import kB1 from "../../notes/keyboard_a_pentatonic/B1.mp3";
import kCs2 from "../../notes/keyboard_a_pentatonic/Cs2.mp3";
import kE2 from "../../notes/keyboard_a_pentatonic/E2.mp3";
import kFs2 from "../../notes/keyboard_a_pentatonic/Fs2.mp3";
import kA2 from "../../notes/keyboard_a_pentatonic/A2.mp3";
// drums
import dA1 from "../../notes/drums/kick.mp3";
import dB1 from "../../notes/drums/snare.mp3";
import dCs2 from "../../notes/drums/hh.mp3";
import dE2 from "../../notes/drums/hho.mp3";
import dFs2 from "../../notes/drums/agogoHigh.mp3";
import dA2 from "../../notes/drums/agogoLow.mp3";

class MainGrid extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoaded: false,
        }
        this.sampler = new Tone.Sampler(
            { 
                bA1, bB1, "bC#2": bCs2, bE2, "bF#2": bFs2, bA2,
                pA1, pB1, "pC#2": pCs2, pE2, "pF#2": pFs2, pA2,
                kA1, kB1, "kC#2": kCs2, kE2, "kF#2": kFs2, kA2,
                dA1, dB1, "dC#2": dCs2, dE2, "dF#2": dFs2, dA2
            },
            {
              onload: () => {
                this.setState({ isLoaded: true });
              }
            }
          ).toMaster();
    }

    render() {
        if(!this.state.isLoaded) return null;

        return(
            <div>
                <Grid 
                    mainGridNotes={}
                    allNotes={this.props.allNotes}
                    sampler={this.sampler}
                    instrument={this.props.instrument}
                />
                <MiniGrid 
                    // notes={this.props.grids[?]}
                />
                <MiniGrid />
                <MiniGrid />
            </div>
        )
    }
}