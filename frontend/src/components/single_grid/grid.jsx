import React from 'react';
import GridColumn from './grid_col';
import styles from './grid.module.css';
import * as Tone from 'tone';

import A1 from "../../notes/a_pentatonic/A1.mp3";
import B1 from "../../notes/a_pentatonic/B1.mp3";
import Cs2 from "../../notes/a_pentatonic/Cs2.mp3";
import E2 from "../../notes/a_pentatonic/E2.mp3";
import Fs2 from "../../notes/a_pentatonic/Fs2.mp3";
import A2 from "../../notes/a_pentatonic/A2.mp3";

export default class Grid extends React.Component {
  constructor(props){
    super(props);
    this.state = { 
      isLoaded: false,
      selected: [
      "", "", "", "", "", "", "", "",
      "", "", "", "", "", "", "", "",
      "", "", "", "", "", "", "", "",
      "", "", "", "", "", "", "", "",
    ],
    last: 0,
    playing: false
    }
    console.log(Tone.state === "paused") 

    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handlePause = this.handlePause.bind(this)
    this.sampler = new Tone.Sampler(
      { A1, B1, "C#2": Cs2, E2, "F#2": Fs2, A2 },
      {
        onload: () => {
          this.setState({ isLoaded: true });
        }
      }
    ).toMaster();
    // this.noteNames = ["A1", "F#", "E", "C#", "B", "A2"];
    this.noteNames = ["A1", "B1", "C#2", "E2", "F#2", "A2"].reverse();
  }


  //handle update updates the state of the grid, taking in the number of the column,
  //and the selected index
  handleUpdate(column, index){
    let arr = this.state.selected
    if(index !== -1){
      arr[column] = this.noteNames[index];
    } else arr[column] = "";
    this.setState({selected: arr})
  }

  handleClick(note) {

    console.log("here")
    this.sampler.triggerAttack(note);
  }

  handleStart() {
    Tone.Transport.toggle();
    this.setState({ playing: !this.state.playing })
    let i = 0
    const interval = Tone.Transport.scheduleRepeat((time) => {
      this.sampler.triggerAttackRelease(this.state.selected[i],"8n")
      i += 1
      this.setState({last: this.state.last+1})
      if (this.state.selected[i] == "") {
        Tone.Transport.clear(interval)
        Tone.Transport.toggle()
        this.setState({ playing: !this.state.playing })

      }
    }, "8n");
  

  }

  handlePause() {
    if (this.state.playing) {
    Tone.Transport.pause()
    }else {
      Tone.Transport.start()

    }
    this.setState({ playing: !this.state.playing })


  }

  render(){
    const cols = this.state.selected.map( (ele, colNumber) => 
    <GridColumn
        key={colNumber}
        handleUpdate = {index => this.handleUpdate(colNumber, index)}
        noteNames={this.noteNames}
        handleClick={this.handleClick}
        isLoaded={this.state.isLoaded}
    />
    )
    return(
      <div className={styles.grid}>
        <button disabled={!this.state.isLoaded} onClick={this.handleStart}>
          start
        </button>

        <button disabled={!this.state.isLoaded} onClick={this.handlePause}>
          pause
        </button>
        {cols}
      </div>
    )
  }

}
