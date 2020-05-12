import React from 'react';
import GridColumn from './grid_col';
import styles from './grid.module.css';
import * as Tone from 'tone';

export default class Grid extends React.Component {
  constructor(props){
    super(props);

    this.state = {
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
    this.props.sampler.triggerAttack(note);
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
          this.props.sampler.triggerAttackRelease(this.state.selected[i], "8n");
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
    const cols = this.state.selected.map( (ele, colNumber) => 
    <GridColumn
        key={colNumber}
        handleUpdate = {index => this.handleUpdate(colNumber, index)}
        noteNames={this.noteNames}
        handleClick={this.handleClick}
        isLoaded={this.props.isLoaded}
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
          <button onClick={this.handleStart} disabled={!this.props.isLoaded || this.state.disableStart}>
            start
          </button>
            ) : (
          <button disabled={!this.props.isLoaded} onClick={this.handlePause}>
            pause
          </button>
            )
        }
          <button disabled={!this.props.isLoaded} onClick={this.handleRestart}>
            restart
          </button>
      </div>
    )
  }

}


