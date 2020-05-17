import React from 'react';
import MiniGridColumn from './mini_grid_col';
import styles from './grid.module.css';
import * as Tone from 'tone';

export default class MiniGrid extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      last: 0,
      playing: false,
      scheduleInterval: null,
      pauseSlide: false,
      pauseNote: 0,
      pauseInt: null
    }
   
    this.pauseBtn = React.createRef()

    // this.noteNames = ["A1", "F#", "E", "C#", "B", "A2"];
    this.noteNames = ["A1", "B1", "C#2", "E2", "F#2", "A2"].reverse();
  }
  
  componentDidMount() {
    if (this.props.selected){
      this.setState({selected: this.props.selected})
    } else{
      let arrBeats = [];
      for (let i = 0; i < this.props.beats; i++) {
        arrBeats.push("")
      }
      this.setState({ selected: arrBeats })
    }
  }



  render(){

    if (!this.state.selected) return null;
    const beats = this.props.selected.map( (ele, colNumber) => 
      <MiniGridColumn
          selected={ele}
          idx = {colNumber}
          key={colNumber}
          // handleUpdate = {index => this.handleUpdate(colNumber, index)}
          noteNames={this.noteNames}
          // handleClick={this.handleClick}
          updateLast = {this.updateLast}
      />
    )

    return(

      <div id={styles.mini} className={styles.gridOuter}>
        <div className={styles.grid}>
          {beats}
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


