import React from 'react';
// import KeyboardGrid from '../single_grid/keyboard_grid'
// import PianoGrid from '../single_grid/piano_grid'
// import DrumGrid from '../single_grid/drum_grid'
import BassGrid from '../single_grid/bass_grid'
import { ProtectedRoute } from '../../util/route_util';
import MiniGrid from '../single_grid/mini_grid_partial';
// import Room from '../room/room';
import RoomContainer from '../room/room_container';
import styles from './main.module.css'
import ChatRoom from '../chat/chat_room'
import socketIOClient from "socket.io-client";
import { Switch,Route } from 'react-router-dom';
import { receiveInstrument } from '../../actions/instrument_actions'
import { connect } from 'react-redux'

class MainPage extends React.Component {
  constructor(props) {
    super(props)
  }

  // componentDidMount() {
  //   this.socket.on('instrument update', (data) => {
  //     this.props.receiveInstrument(data['instrument'])
  //   })
  // }
  render() {
    return (
      <div>

        <Switch>
          <ProtectedRoute path="/rooms/:roomName/" component={(props) => <RoomContainer socket = {this.socket}  {...props}/>} />
          <Route path="/" component={() => <BassGrid beats={8}/>} />
          {/* <Route to="/:roomName/" render={() => <RoomContainer beats={}/>} /> */}
        </Switch>

        <h1 className={styles.blurb}>Make Music</h1>
        <footer className={styles.footer}>
          Copyright &copy; 2020 Harmony
        </footer>
      </div>
    );
  }
}


const mDTP = dispatch => {

  return {
    receiveInstrument: instrument => dispatch(receiveInstrument(instrument)),
  }
}

export default connect(null, mDTP)(MainPage);
