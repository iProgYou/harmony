import React from 'react';
import MiniGridColumn from './mini_grid_col';
import styles from './grid.module.css';
import * as Tone from 'tone';

export default class MiniGrid extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      selected: null,
      last: 0,
      playing: false,
      scheduleInterval: null,
      pauseSlide: false,
      pauseNote: 0,
      pauseInt: null
    }
   
    // this.handleStart = this.handleStart.bind(this);
    // this.handlePause = this.handlePause.bind(this);
    // this.updateLast = this.updateLast.bind(this)
    // this.handleRestart = this.handleRestart.bind(this)
    // this.animateNote = this.animateNote.bind(this)

    this.pauseBtn = React.createRef()

    // this.noteNames = ["A1", "F#", "E", "C#", "B", "A2"];
    this.noteNames = ["A1", "B1", "C#2", "E2", "F#2", "A2"].reverse();
  }
  
  componentDidMount() {
    if (this.props.selected){
      this.setState({selected: this.props.selected})
    } else{
      let arrCols = [];
      for (let i = 0; i < this.props.cols; i++) {
        arrCols.push("")
      }
      this.setState({ selected: arrCols })
    }
  }


  //handle update updates the state of the grid, taking in the number of the column,
  //and the selected index


  // handleStart() {
  //   if (this.state.last !== 0) {
  //     Tone.Transport.toggle();
  //     this.setState({ playing: !this.state.playing});
  //     let i = 0;
  //     const interval = Tone.Transport.scheduleRepeat(() => {
  //       this.animateNote(i)

  //       if (i === 0 ) {
  //         this.setState({ scheduleInterval: interval  });
  //       }
  //       if (this.state.selected[i]) {
  //         this.props.sampler.triggerAttackRelease(this.state.selected[i], "8n");
  //       }
  //       i += 1
  //       if (i === this.state.last + 1) {
  //         Tone.Transport.clear(interval);
  //         Tone.Transport.toggle();
  //         this.setState({ playing: !this.state.playing, scheduleInterval: null, pauseNote: 0, pauseInt: null });   
  //       }
  //     }, "8n");
  //   }
  // }

  // animateNote(i) {
  //   document.getElementById(`${i}`).style.opacity = ".7"
  //   let k = i
  //   const pauseInt = setTimeout(() => {
  //     document.getElementById(`${k}`).style.opacity = "1"
  //   }, 250)
  //   this.setState({ startSlide: true, pauseNote: i, pauseInt: pauseInt })
  // }

  // handlePause() {
  
  //   if (this.state.playing) {
  //     Tone.Transport.pause();
  //     clearTimeout(this.state.pauseInt)
  //     document.getElementById(`${this.state.pauseNote}`).style.opacity = ".7"
  //     this.pauseBtn.current.innerHTML = 'PLAY'
  //   } else {
  //     Tone.Transport.start();
  //     document.getElementById(`${this.state.pauseNote}`).style.opacity = "1"
  //     this.pauseBtn.current.innerHTML = 'PAUSE'

  //   }
  //   this.setState({playing: !this.state.playing });
  // }

  // handleRestart() {
  //   if (this.state.scheduleInterval || this.state.scheduleInterval === 0) {
  //     Tone.Transport.start();
  //     Tone.Transport.clear(this.state.scheduleInterval);
  //     Tone.Transport.toggle();
  //     document.getElementById(`${this.state.pauseNote}`).style.opacity = "1"
  //     this.setState({ playing: !this.state.playing, scheduleInterval: null, pauseNote: 0, pauseInt: null });   
  //    } 
  // }


  render(){

    if (!this.state.selected) return null;
    console.log(this.state.selected)
    const cols = this.state.selected.map( (ele, colNumber) => 
    <MiniGridColumn
        selected={ele}
        idx = {colNumber}
        key={colNumber}
        // handleUpdate = {index => this.handleUpdate(colNumber, index)}
        noteNames={this.noteNames}
        // handleClick={this.handleClick}
        isLoaded={this.props.isLoaded}
        updateLast = {this.updateLast}
    />
    )
    return(

      <div id={styles.mini} className={styles.gridOuter}>
        <div className={styles.grid}>
          {cols}
        </div>
        {/* {
          this.state.scheduleInterval === null ? (
          <button className={styles.button} onClick={this.handleStart} disabled={!this.props.isLoaded}>
            START
          </button>
            ) : (
              <button className={styles.button} ref={this.pauseBtn} disabled={!this.props.isLoaded} onClick={this.handlePause}>
            PAUSE
          </button>
            )
        }
        <button className={styles.button} disabled={!this.props.isLoaded} onClick={this.handleRestart}>
            RESTART
          </button> */}
      </div>
    )
  }

}


