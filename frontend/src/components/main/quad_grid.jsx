import React from 'react';
import Grid from './quad_grid_parts/grid_partial'
import * as Tone from 'tone';
import { FaPlay, FaUserFriends, FaRedo } from 'react-icons/fa';
import { BsFillStopFill } from 'react-icons/bs';

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
import styles from "./quad_grid_parts/grid.module.css"

class QuadGrid extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoaded: false,
            isPlaying: false
        }
        this.allNotes = Array.from( new Array(props.beats), function() { return []; } );
        console.log(this.allNotes)
        console.log(props.beats)
        this.singleInst = ['piano','keyboard','bass'];
        this.sampler = new Tone.Sampler(
            {
                A1: bA1, B1: bB1, C1: bCs2, D1: bE2, E1: bFs2, F1: bA2, 
                A2: pA1, B2: pB1, C2: pCs2, D2: pE2, E2: pFs2, F2: pA2,
                A3: kA1, B3: kB1, C3: kCs2, D3: kE2, E3: kFs2, F3: kA2, 
                A4: dA1, B4: dB1, C4: dCs2, D4: dE2, E4: dFs2, F4: dA2, 
            },
            {
              onload: () => {
                this.setState({ isLoaded: true });
              }
            }
        ).toMaster();
        this.encodeNotes = {
            // piano
            "bass": { "A1": "A1", "B1": "B1", "C#2": "C1", "E2": "D1", "F#2": "E1", "A2": "F1" },
            "piano": { "A1": "A2", "B1": "B2", "C#2": "C2", "E2": "D2", "F#2": "E2", "A2": "F2" },
            "keyboard": { "A1": "A3", "B1": "B3", "C#2": "C3", "E2": "D3", "F#2": "E3", "A2": "F3" },
            "drums": { "A1": "A4", "B1": "B4", "C#2": "C4", "E2": "D4", "F#2": "E4", "A2": "F4" }
        }
        this.decode = {'bass':'1','piano':'2','keyboard':'3','drums':'4'}

        this.processNote = this.processNote.bind(this);
        this.getInstrumentNotes = this.getInstrumentNotes.bind(this);
        this.togglePlay = this.togglePlay.bind(this)
        this.btnRef = React.createRef()
        this.resetBtnRef = React.createRef()
        this.replayBtnRef = React.createRef()
    }

    processNote(instrumentName,note,remove,column) {

        let currentNote = this.encodeNotes[instrumentName][note];
        if (!remove && currentNote) this.sampler.triggerAttack(currentNote);

        if (currentNote) {
            if (this.allNotes[column].some(ele => ele[1] === this.decode[instrumentName])) {
                this.allNotes[column] = this.allNotes[column]
                .filter(eachNote => eachNote[1] !== this.decode[instrumentName])
            }
            this.allNotes[column].push(currentNote)
        } else {
            
            this.allNotes[column] = this.allNotes[column]
                .filter(eachNote => eachNote[1] !== this.decode[instrumentName])
        }

        // let newAllNotes = this.allNotes;
        // // if (remove) {
        //     // debugger
        // //     this.allNotes[column].filter(ele => ele != currentNote)
        // // } else {
        //     // play the note here
        //     if (!currentNote) {
        //         debugger
        //         this.allNotes[column].filter(eachNote => eachNote[1] === this.decode[instrumentName])
        //     } else if (this.allNotes[column].includes(currentNote)) {
        //         return
        //     } else {
        //     }
        // // }
        // // this.allNotes = newAllNotes
    }

    getInstrumentNotes(instrument) {
        let currentInstNoteArr = [];

        for (let i = 0; i < this.props.beats; i++) {
            currentInstNoteArr.push([])
            for (let j = 0; j < this.allNotes[i].length; j++) {
                if (this.allNotes[i][j][1] === this.decode[instrument]) {
                    currentInstNoteArr[i].push(this.allNotes[i][j])
                }
            }
        }
        return currentInstNoteArr
    }

   togglePlay() {
    this.setState({isPlaying: !this.state.isPlaying})
   }

    render() {
        if (!this.state.isLoaded) return null;
        return(
            <div>
                
                    {/* // this.state.isPlaying ? ( */}
                        <button disabled = {!this.state.isPlaying} ref={this.resetBtnRef} onClick={this.togglePlay}>
                            <BsFillStopFill
                                size={30}
                            />
                        </button>
                    {/* // ) : (  */}
                        <button disabled = {this.state.isPlaying} ref={this.btnRef} onClick={this.togglePlay}>
                            <FaPlay
                                size={20}
                                />
                            <FaUserFriends
                                size={24}
                                />
                        </button>
                    {/* // ) */}
                <button disabled={this.state.isPlaying} ref={this.replayBtnRef}>
                    <FaRedo
                        size={30}
                    />
                </button>
                
            <div className = {styles.quadGrid}>
                {this.singleInst.map((instrument,i) => (
                    <Grid
                        key={i}
                        isLoaded={ this.state.isLoaded }
                        instrument={instrument} 
                        beats={this.props.beats}
                        // quadGrid={true}
                        processNote={this.processNote}
                        sampler={this.sampler}
                        getInstrumentNotes={this.getInstrumentNotes}
                        btnRef = {this.btnRef}
                        allNotes = {this.allNotes}
                        resetBtnRef = {this.resetBtnRef}
                        togglePlay = {this.togglePlay}
                        replayBtnRef = {this.replayBtnRef}
                       
                    />
                ))}

            </div>
        </div>
        )
    }
};

export default QuadGrid;