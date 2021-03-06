import React from 'react';
import GridColumn from './grid_col_multi';
import styles from './grid.module.css';
import * as Tone from 'tone';

import A1 from "../../notes/drums/kick.mp3";
import B1 from "../../notes/drums/snare.mp3";
import Cs2 from "../../notes/drums/hh.mp3";
import E2 from "../../notes/drums/hho.mp3";
import Fs2 from "../../notes/drums/agogoHigh.mp3";
import A2 from "../../notes/drums/agogoLow.mp3";

export default class DrumGrid extends React.Component {
    constructor(props){
      super(props);
  
      this.state = {
        isLoaded: false,
        selected: null,
        last: 0,
        playing: false,
        disableStart: false,
        scheduleInterval: null
      }
  
     
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
      let arrBeats = [];
      for (let i = 0; i < this.props.beats; i++) {
        arrBeats.push("")
      }
      this.setState({ selected: arrBeats })
    }
  
  
    //handle update updates the state of the grid, taking in the number of the column,
    //and the selected index
    handleUpdate(column, arr){
      // debugger
      let selected = this.state.selected
      selected[column] = arr;
    //   if(arr.length === 0){
    //     selected[column] = [];
    //   } else selected[column] = arr;
      this.setState({ selected })
    }
  
    handleClick(note) {
      this.sampler.triggerAttack(note);
    }
   
    handleStart() {
      if (this.state.last !== 0) {
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
            this.setState({ playing: !this.state.playing, disableStart: false, scheduleInterval: null});
          }
        }, "8n");
      }
    }
  
    handlePause() {
  
      if (this.state.playing) {
        Tone.Transport.pause();
      }else {
        Tone.Transport.start();
      }
      this.setState({playing: !this.state.playing });
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
      const beats = this.state.selected.map( (ele, colNumber) => 
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
            {beats}
          </div>
          {
            this.state.scheduleInterval === null ? (
            <button onClick={this.handleStart} disabled={!this.state.isLoaded}>
              START
            </button>
              ) : (
            <button disabled={!this.state.isLoaded} onClick={this.handlePause}>
              PAUSE
            </button>
              )
          }
            <button disabled={!this.state.isLoaded} onClick={this.handleRestart}>
              RESTART
            </button>
        </div>
      )
    }
  
  }

// import React from 'react';
// import Grid from './grid';
// import * as Tone from 'tone';

// import A1 from "../../notes/drums/kick.mp3";
// import B1 from "../../notes/drums/snare.mp3";
// import Cs2 from "../../notes/drums/hh.mp3";
// import E2 from "../../notes/drums/hho.mp3";
// import Fs2 from "../../notes/drums/agogoHigh.mp3";
// import A2 from "../../notes/drums/agogoLow.mp3";

// export default class DrumGrid extends React.Component {
//   constructor(props){
//     super(props);

//     this.state = {
//       isLoaded: false,
//     }

//     this.sampler = new Tone.Sampler(
//       { A1, B1, "C#2": Cs2, E2, "F#2": Fs2, A2 },
//       {
//         onload: () => {
//           this.setState({ isLoaded: true });
//         }
//       }
//     ).toMaster();
//   }

//   render(){
//     if (!this.state.isLoaded) return null;
//     return(
//       <Grid 
//         isLoaded={ this.state.isLoaded }
//         beats={ this.props.beats }
//         sampler={ this.sampler }
//       />
//     )
//   }
// }