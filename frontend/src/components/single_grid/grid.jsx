import React from 'react';
import GridColumn from './grid_col';
import styles from './grid.module.css';
import * as Tone from 'tone';

// import A1 from "../../notes/a_pentatonic/A1.mp3";
// import B1 from "../../notes/a_pentatonic/B1.mp3";
// import Cs2 from "../../notes/a_pentatonic/Cs2.mp3";
// import E2 from "../../notes/a_pentatonic/E2.mp3";
// import Fs2 from "../../notes/a_pentatonic/Fs2.mp3";
// import A2 from "../../notes/a_pentatonic/A2.mp3";


import A1 from "../../notes/piano_a_pentatonic/A1.mp3";
import B1 from "../../notes/piano_a_pentatonic/B1.mp3";
import Cs2 from "../../notes/piano_a_pentatonic/Cs2.mp3";
import E2 from "../../notes/piano_a_pentatonic/E2.mp3";
import Fs2 from "../../notes/piano_a_pentatonic/Fs2.mp3";
import A2 from "../../notes/piano_a_pentatonic/A2.mp3";

export default class Grid extends React.Component {
  constructor(props){
    super(props);
    this.state = { isLoaded: false }
   
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.updateLast = this.updateLast.bind(this)
    this.handleRestart = this.handleRestart.bind(this)

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
  
  componentDidMount() {
    let arrCols = [];
    for (let i = 0; i < this.props.cols; i++) {
      arrCols.push("")
    }
    this.setState({ selected: arrCols })
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
    this.sampler.triggerAttack(note);
  }

  handleStart() {
    Tone.Transport.toggle();
    this.setState({ playing: !this.state.playing, disableStart: true});
    let i = 0;
    const interval = Tone.Transport.scheduleRepeat((time) => {
      if (i === 0 ) {
        this.setState({ scheduleInterval: interval  });
      }
      if (this.state.selected[i]) {
        this.sampler.triggerAttackRelease(this.state.selected[i], "8n");
      }
      i += 1
      if (i === this.state.last + 1) {
        Tone.Transport.clear(interval);
        Tone.Transport.toggle();
        this.setState({ playing: !this.state.playing, disableStart: false});
      }
    }, "8n");
  }

  handlePause() {

    if (this.state.playing) {
      Tone.Transport.pause();
    }else {
      Tone.Transport.start();
    }
    this.setState({ playing: !this.state.playing });
  }

  handleRestart() {

    if (this.state.scheduleInterval) {
      Tone.Transport.clear(this.state.scheduleInterval);
      Tone.Transport.toggle();
      this.setState({ playing: !this.state.playing, disableStart: false, scheduleInterval: null });   
     } 

  }


  updateLast() {
    let lastIdx = 0
    for (let i = this.state.selected.length-1; i>=0; i--) {
      if (this.state.selected[i] !== "") {
        lastIdx = i;
        break;
      }
    }
    this.setState( { last: lastIdx })
  }


  render(){
    if (!this.state.selected) return null;
    const cols = this.state.selected.map( (ele, colNumber) => 
    <GridColumn
        key={colNumber}
        handleUpdate = {index => this.handleUpdate(colNumber, index)}
        noteNames={this.noteNames}
        handleClick={this.handleClick}
        isLoaded={this.state.isLoaded}
        updateLast = {this.updateLast}
    />
    )
    return(

      <div className={styles.gridOuter}>
        <div className={styles.grid}>
        {cols}
        </div>
        <button onClick={this.handleStart} disabled={!this.state.isLoaded || this.state.disableStart}>
          start
        </button>

        <button disabled={!this.state.isLoaded} onClick={this.handlePause}>
          pause
        </button>

        <button disabled={!this.state.isLoaded} onClick={this.handleRestart}>
          restart
        </button>
      </div>
    )
  }

}
