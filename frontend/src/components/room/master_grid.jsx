import React from 'react';
import GridColumn from '../single_grid/grid_col';
import MultiGridColumn from '../single_grid/grid_col_multi';
import styles from '../single_grid/grid.module.css';
import * as Tone from 'tone';
import { connect } from 'react-redux';
import {receiveGrid} from '../../actions/grid_actions'
import {receiveRoom} from '../../actions/room_actions'
import { FaPlay, FaPause, FaRedo ,FaUserFriends } from 'react-icons/fa';
import { BsFillStopFill } from 'react-icons/bs';
import socketIOClient from "socket.io-client";

class MasterGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: props.mainGridNotes,
      playing: false,
      scheduleInterval: null,
      pauseSlide: false,
      pauseNote: 0,
      pauseInt: null,
      replay: false
    }
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.handleRestart = this.handleRestart.bind(this)
    this.animateNote = this.animateNote.bind(this)
    this.handleStartGrid = this.handleStartGrid.bind(this)
    this.encodeDrumNotes = this.encodeDrumNotes.bind(this)
    this.toggleReplay = this.toggleReplay.bind(this)
   
    this.gridRef = React.createRef()
    this.pauseBtn = React.createRef()
    this.socket = socketIOClient();

    // this.noteNames = ["A1", "F#", "E", "C#", "B", "A2"];
    this.noteNames = ["A1", "B1", "C#2", "E2", "F#2", "A2"].reverse();

    this.encodeNotes = {
      "keyboard": { "A1": "A3", "B1": "B3", "C#2": "C3", "E2": "D3", "F#2": "E3", "A2": "F3" },
      "piano": { "A1": "A2", "B1": "B2", "C#2": "C2", "E2": "D2", "F#2": "E2", "A2": "F2" },
      "bass": { "A1": "A1", "B1": "B1", "C#2": "C1", "E2": "D1", "F#2": "E1", "A2": "F1" },
      "drums": { "A1": "A4", "B1": "B4", "C#2": "C4", "E2": "D4", "F#2": "E4", "A2": "F4" }

    }
  }


  componentDidMount() {
    // this.socket = socketIOClient();
    this.props.socket.on('grid update', (grid) => {
      this.props.receiveGrid(grid)
    });
    this.props.socket.on('update room', (room) => {
      this.props.receiveRoom(room)
    })

    this.props.socket.emit('update room', this.props.currentRoom);
    window.addEventListener("beforeunload", () => this.componentCleanup() );
  }

  componentCleanup() {

    const {currentRoom, currentUserId} = this.props
    
    if (currentRoom.memberIds.length > 1) {
      let roomDataRemove = { userId: currentUserId, roomId: this.props.currentRoom._id, removeId: true }
      this.props.updateRoom(roomDataRemove)

      let updatedRoom = { ...currentRoom }
      updatedRoom.memberIds = currentRoom.memberIds.splice(currentRoom.memberIds.indexOf(currentUserId), 1)
      this.props.socket.emit('update room', updatedRoom)
    }else if (currentRoom.memberIds.length === 1) {

    }

    this.socket.disconnect(true)
  }
  componentWillUnmount() {
    this.componentCleanup()
    window.removeEventListener('beforeunload', this.componentCleanup);
  }
  

  //handle update updates the state of the grid, taking in the number of the column,
  //and the selected index
  handleUpdate(column, index){
    let arr = this.state.selected
    if(index instanceof Array){
       arr[column] = index 
    } else if ((index !== -1)) {
      arr[column] = this.noteNames[index];
    } else arr[column] = "";
    this.setState({selected: arr})

    let grid = {
      notes: this.state.selected,
      instrument: this.props.instrument,
      userId: this.props.currentUserId,
      beats: this.props.beats
    }
    // this.props.receiveGrid({grid})
    this.props.socket.emit('grid update', grid);

  }

  handleClick(note) {
 
    this.props.sampler.triggerAttack(this.encodeNotes[this.props.instrument][note]);
  }

  
  
  handleStart(loop) {

      Tone.Transport.toggle();
      this.setState({ playing: !this.state.playing});
      let i = 0;
      const interval = Tone.Transport.scheduleRepeat(() => {
        this.animateNote(i)
        if (i === 0 ) {
          this.setState({ scheduleInterval: interval  });
        }
        if (this.props.allNotes[i]) {
          this.props.sampler.triggerAttackRelease(this.props.allNotes[i], "8n");
        }
        i += 1
        if (i === this.props.allNotes.length && !loop) {
          Tone.Transport.clear(interval);
          Tone.Transport.toggle();
          this.setState({ playing: !this.state.playing, scheduleInterval: null, pauseNote: 0, pauseInt: null });   
        } else if (i === this.props.allNotes.length && loop) {
            i = 0;
        }
      }, "8n");

    }

  encodeDrumNotes(idx) {
    return this.state.selected[idx].map(note => this.encodeNotes[this.props.instrument][note])
  }
    
  handleStartGrid(loop) {
    if (!this.state.playing) {
      Tone.Transport.toggle();
      this.setState({ playing: !this.state.playing });
      let i = 0;
      const interval = Tone.Transport.scheduleRepeat(() => {
        this.animateNote(i)

        if (i === 0) {
          this.setState({ scheduleInterval: interval });
        }
        if (this.state.selected[i]) {
          if (this.props.instrument === "drums") {
            this.props.sampler.triggerAttackRelease(this.encodeDrumNotes(i), "8n");
          } else {
            this.props.sampler.triggerAttackRelease(this.encodeNotes[this.props.instrument][this.state.selected[i]], "8n");
          }
        }
        i += 1
        if (i === this.state.selected.length && !loop) {
          Tone.Transport.clear(interval);
          Tone.Transport.toggle();
          this.setState({ playing: !this.state.playing, scheduleInterval: null, pauseNote: 0, pauseInt: null });
        } else if (i === this.state.selected.length && loop) {
          i = 0;
        }
      }, "8n");

  }

  }

  animateNote(i) {
    document.getElementById(`${i}`).style.opacity = ".7"
    if (i < this.props.allNotes.length-2) {
      document.getElementById(`${i+2}`).scrollIntoView({behavior: 'smooth', block: 'center'})
    }

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
      this.setState({ playing: false, scheduleInterval: null, pauseNote: 0, pauseInt: null });   
     } 
  }

  toggleReplay() {
    this.setState({replay: !this.state.replay})
  }


  render(){
    if (!this.state.selected) return null;
    const beats = this.props.instrument === "drums" ? (
      this.state.selected.map( (ele, colNumber) => 
        <MultiGridColumn
            selected={ele}
            idx = {colNumber}
            key={colNumber}
            handleUpdate = {index => this.handleUpdate(colNumber, index)}
            noteNames={this.noteNames}
            handleClick={this.handleClick}
            isLoaded={this.props.isLoaded}
           
        />
      )
    ) : (
      this.state.selected.map( (ele, colNumber) => 
        <GridColumn
            selected={ele}
            idx = {colNumber}
            key={colNumber}
            handleUpdate = {index => this.handleUpdate(colNumber, index)}
            noteNames={this.noteNames}
            handleClick={this.handleClick}
            isLoaded={this.props.isLoaded}
        />
      )
    )

    const pauseBtn = !this.state.playing ? (
      <div className={styles.bbDiv}>
        <FaPlay
          size={20}
        />
        <FaUserFriends
          size={24}
        />
        </div>
    ) : (
      <FaPause 
        size={20}
      />
    )
  
    return(

      <div className={styles.gridOuter}>
        <div ref = {this.gridRef} className={styles.grid}>
          {beats}
        </div>
        <div className={styles.buttons}>

        {
          this.state.scheduleInterval === null ? (
          <button className={styles.bigButton} onClick={() => this.handleStart(this.state.replay)} disabled={!this.props.isLoaded}>
            <div className={styles.bbDiv}>
              <FaPlay 
                size={20}
              />
              <FaUserFriends
                size={24}
              />
            </div>
          </button>
            ) : (
          <button className={((!this.state.playing) ? styles.bigButton : styles.button)} ref={this.pauseBtn} disabled={!this.props.isLoaded} onClick={this.handlePause}>
            {pauseBtn}
          </button>
            )
        }



          {
            this.state.scheduleInterval === null ? (
              <button className={styles.bigButton} onClick={() => this.handleStartGrid(this.state.replay)} disabled={!this.props.isLoaded}>
                <div className={styles.bbDiv}>
                  <FaPlay
                    size={20}
                  />
                </div>
              </button>
            ) : (
                <button className={((!this.state.playing) ? styles.bigButton : styles.button)} ref={this.pauseBtn} disabled={!this.props.isLoaded} onClick={this.handlePause}>
                  {pauseBtn}
                </button>
              )
          }

        {/* <button className={styles.button} disabled={!this.props.isLoaded} onClick={() => this.handleStartGrid(this.state.replay)}>
          <FaPlay 
            size={20}
          />
        </button>
         */}
        <button className={styles.button} disabled={!this.props.isLoaded} onClick={this.handleRestart}>
          <BsFillStopFill
            size={30}
          />
        </button>   
      
        <button className={styles.bigButton} onClick={this.toggleReplay} disabled={!this.props.isLoaded}>
          <div className={styles.bbDiv}>
            <FaRedo
              size={20}
            />
          </div>
        </button>
          
        </div>

      </div>
    )
  }
}



const mDTP = dispatch => {

  return {
    receiveGrid: (grid) => dispatch(receiveGrid(grid)),
    receiveRoom: (room) => dispatch(receiveRoom(room))
  }

}

export default connect(null, mDTP)(MasterGrid)