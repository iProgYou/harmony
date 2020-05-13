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
      selected: null,
      last: 0,
      playing: false,
      scheduleInterval: null,
      pauseSlide: false,
      pauseNote: 0,
      pauseInt: null
    }

   
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.updateLast = this.updateLast.bind(this)
    this.handleRestart = this.handleRestart.bind(this)
    this.animateNote = this.animateNote.bind(this)

    this.pauseBtn = React.createRef()

    this.sampler = new Tone.Sampler(
      { A1, B1, "C#2": Cs2, E2, "F#2": Fs2, A2 },
      {
        onload: () => {
          this.setState({ isLoaded: true });
        }
      }
    ).toMaster();

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
    if (this.state.last !== 0) {
      Tone.Transport.toggle();
      this.setState({ playing: !this.state.playing});
      let i = 0;
      const interval = Tone.Transport.scheduleRepeat(() => {
        this.animateNote(i)

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
          this.setState({ playing: !this.state.playing, scheduleInterval: null, pauseNote: 0, pauseInt: null });   
        }
      }, "8n");
    }
  }

  animateNote(i) {
    document.getElementById(`${i}`).style.opacity = ".7"
    let k = i
    const pauseInt = setTimeout(() => {
      document.getElementById(`${k}`).style.opacity = "1"
    }, 250)
    this.setState({ startSlide: true, pauseNote: i, pauseInt: pauseInt })
  }

  handlePause() {
  
    if (this.state.playing) {
      Tone.Transport.pause();
      clearTimeout(this.state.pauseInt)
      document.getElementById(`${this.state.pauseNote}`).style.opacity = ".7"
      this.pauseBtn.current.innerHTML = 'Play'
    } else {
      Tone.Transport.start();
      document.getElementById(`${this.state.pauseNote}`).style.opacity = "1"
      this.pauseBtn.current.innerHTML = 'Pause'

    }
    this.setState({playing: !this.state.playing });
  }

  handleRestart() {
    if (this.state.scheduleInterval || this.state.scheduleInterval === 0) {
      Tone.Transport.start();
      Tone.Transport.clear(this.state.scheduleInterval);
      Tone.Transport.toggle();
      document.getElementById(`${this.state.pauseNote}`).style.opacity = "1"
      this.setState({ playing: !this.state.playing, scheduleInterval: null, pauseNote: 0, pauseInt: null });   
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
        idx = {colNumber}
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
        {
          this.state.scheduleInterval === null ? (
          <button onClick={this.handleStart} disabled={!this.state.isLoaded}>
            Start
          </button>
            ) : (
          <button ref = {this.pauseBtn} disabled={!this.state.isLoaded} onClick={this.handlePause}>
            Pause
          </button>
            )
        }
          <button disabled={!this.state.isLoaded} onClick={this.handleRestart}>
            Restart
          </button>
      </div>
    )
  }

}


