import React from 'react';
import GridColumn from './grid_col';
import styles from './grid.module.css';
import * as Tone from 'tone';
import { FaPlay, FaPause } from 'react-icons/fa';
import { BsFillStopFill } from 'react-icons/bs';

export default class Grid extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      selected: null,
      playing: false,
      scheduleInterval: null,
      pauseSlide: false,
      pauseNote: 0,
      pauseInt: null,
      loop: false
    }
   
    this.handleUpdate = this.handleUpdate.bind(this);
    // this.handleClick = this.handleClick.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handleStartAll = this.handleStartAll.bind(this)
    this.handlePause = this.handlePause.bind(this);
    this.handleRestart = this.handleRestart.bind(this)
    this.animateNote = this.animateNote.bind(this)
    this.toggleLoop = this.toggleLoop.bind(this)

    this.pauseBtn = React.createRef()

    // this.noteNames = ["A1", "F#", "E", "C#", "B", "A2"];
    this.noteNames = ["A1", "B1", "C#2", "E2", "F#2", "A2"].reverse();
  }
  
  componentDidMount() {
    let arrBeats = [];
    for (let i = 0; i < this.props.beats; i++) {
      arrBeats.push("")
    }
    this.setState({ selected: arrBeats })

    // if (this.props.instrument === 'piano') {
      this.props.btnRef.current.addEventListener('click', () => this.handleStart(this.state.loop) )
      this.props.resetBtnRef.current.addEventListener('click', this.handleRestart)
      this.props.replayBtnRef.current.addEventListener('click', this.toggleLoop)
    // }

  }

  // componentDidUpdate() {
  //   if (this.props.resetBtnRef.current) {
  //     this.props.resetBtnRef.current.addEventListener('click', this.handleRestart)

  //   }
  // }

  //handle update updates the state of the grid, taking in the number of the column,
  //and the selected index
  // Three actions:
  // 1. Clicking an unclicked note
  // 2. Clicking a note already clicked
  // 3. Clicking another space on the column with another note selected
  handleUpdate(column, index){
    let arr = this.state.selected
    let note = this.noteNames[index]
    let remove = false
    if(index !== -1){
      // case 1 and 3
      arr[column] = note;
    } else {
      // case 2
      // remove whatever note is in the column
      // no notes in column
      arr[column] = ""
      remove = true
    };
    if (this.props.processNote) this.props.processNote(this.props.instrument,arr[column],remove, column)
    this.setState({selected: arr})
  }


  // handleClick(note) {
  //   this.props.sampler.triggerAttack(note);
  // }

  handleStart(loop) {
    this.props.togglePlaying(this.props.instrument)
    let currentInstNotes = this.props.getInstrumentNotes(this.props.instrument)
    this.setState({ startBtn: false })
      Tone.Transport.toggle();
      this.setState({ playing: !this.state.playing});
      this.props.togglePlay()   

      let i = 0;
      const interval = Tone.Transport.scheduleRepeat(() => {
        this.animateNote(i)

        if (i === 0 ) {
          this.setState({ scheduleInterval: interval  });
        }
        if (currentInstNotes[i]) {
          this.props.sampler.triggerAttackRelease(currentInstNotes[i], "8n");
        }

        i += 1
        if (i === currentInstNotes.length && !loop) {
          Tone.Transport.clear(interval);
          Tone.Transport.toggle();
          this.setState({ playing: !this.state.playing, scheduleInterval: null, pauseNote: 0, pauseInt: null });
          this.props.togglePlay()
          this.props.togglePlaying(null)
        } else if (i === currentInstNotes.length && loop) {
          i = 0
        }
      }, "8n");
    
  }

  animateNote(i) {
    document.getElementById(`${i}` + `${this.props.instrument}`).style.opacity = ".7"
    let k = i
    const pauseInt = setTimeout(() => {
      document.getElementById(`${k}` + `${this.props.instrument}`).style.opacity = "1"
    }, 250)
    this.setState({ startSlide: true, pauseNote: i.toString() + `${this.props.instrument}`, pauseInt: pauseInt })
  }

  handlePause() {
  
    if (this.state.playing) {
      Tone.Transport.pause();
      clearTimeout(this.state.pauseInt)
      document.getElementById(`${this.state.pauseNote}`).style.opacity = ".7"
    } else {
      Tone.Transport.start();
      document.getElementById(`${this.state.pauseNote}`).style.opacity = "1"
    }
    this.setState({playing: !this.state.playing });

  }

  handleRestart() {
    if (this.state.scheduleInterval || this.state.scheduleInterval === 0) {
      Tone.Transport.start();
      Tone.Transport.clear(this.state.scheduleInterval);
      Tone.Transport.toggle();
      document.getElementById(`${this.state.pauseNote}`).style.opacity = "1"
      this.props.togglePlay()   
      this.props.togglePlaying(null)
      this.setState({ playing: !this.state.playing, scheduleInterval: null, pauseNote: 0, pauseInt: null });
    } 
  }

  handleStartAll(loop) {
    Tone.Transport.toggle();
    this.setState({ playing: !this.state.playing });
    let i = 0;
    const interval = Tone.Transport.scheduleRepeat(() => {
      this.animateNote(i)
      if (i === 0) {
        this.setState({ scheduleInterval: interval });
      }
      if (this.props.allNotes[i]) {
        this.props.sampler.triggerAttackRelease(this.props.allNotes[i], "8n");
      }
      i += 1
      if (i === this.props.allNotes.length && !loop) {
        Tone.Transport.clear(interval);
        Tone.Transport.toggle();
        this.setState({ playing: !this.state.playing, scheduleInterval: null, pauseNote: 0, pauseInt: null });
        this.props.togglePlay()
      } else if (i === this.props.allNotes.length && loop) {
        i = 0;
      }
    }, "8n");

  }

  toggleLoop() {
    this.setState({loop: !this.state.loop})
  }




  render(){
    if (!this.state.selected) return null;
    const beats = this.state.selected.map( (ele, colNumber) => 
      <GridColumn
          selected={ele}
          idx = {colNumber}
          key={colNumber}
          handleUpdate = {index => this.handleUpdate(colNumber, index)}
          noteNames={this.noteNames}
          instrument = {this.props.instrument}
          // handleClick={this.handleClick}
          isLoaded={this.props.isLoaded}
      />
    )

    const pauseBtn = !this.state.playing ? (
      < FaPlay size={20} />
    ) : (
      < FaPause size={20} />
    )

    return(
      <div className={styles.gridOuter}>
        <div className={styles.grid}>
          {beats}
        </div>
        <div className={styles.buttons}>
        
          {/* this.state.scheduleInterval === null ? ( */}
            <button className={styles.button} onClick={() => this.handleStart(this.state.loop)} 
            disabled={!this.props.isLoaded || this.state.playing || (this.props.instrument !== this.props.currentlyPlaying && this.props.currentlyPlaying !== null )}>
              <FaPlay 
                size={20}
              />

              &nbsp;
              &nbsp;

              < img 
                src = {
                  this.props.instrument === 'piano' ? require('../../../assets/piano.png') :
                  this.props.instrument === 'bass' ? require('../../../assets/bass.png') :
                  this.props.instrument === 'keyboard' ? require('../../../assets/keyboard.png') :
                  require('../../../assets/drums.png')    
                }
                className={styles.instrumentLogo} 
              />
            </button>
            {/* <button className={styles.button} disabled={!this.props.isLoaded} onClick={this.handleRestart}>
              <BsFillStopFill
                size={30}
              />
            </button>
          ) */}
          {/* /* ) 
          // : (
          //   <button className={styles.button} ref={this.pauseBtn} disabled={!this.props.isLoaded} onClick={this.handlePause}>
          //     {pauseBtn}
          //   </button>
          // ) */}

      {/* {
        this.state.scheduleInterval === null ? (
            <button className={styles.button} onClick={() => this.handleStart(true)} disabled={!this.props.isLoaded}>
            Repeat
          </button>
          ) : (
            <button className={styles.button} ref={this.pauseBtn} disabled={!this.props.isLoaded} onClick={this.handlePause}>
            {pauseBtn}
          </button>
          )
        } */}
        {/* <button className={styles.button} disabled={!this.props.isLoaded} onClick={this.handleRestart}>
          <BsFillStopFill
            size={30}
          />
        </button> */}
        </div>
      </div>
    )
  }

}


