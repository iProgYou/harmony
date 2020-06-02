import React from 'react';
// import KeyboardGrid from '../single_grid/keyboard_grid'
// import PianoGrid from '../single_grid/piano_grid'
// import DrumGrid from '../single_grid/drum_grid'
import BassGrid from '../single_grid/bass_grid'
import { ProtectedRoute } from '../../util/route_util';
import RoomContainer from '../room/room_container';
import styles from './main.module.css'
import { Switch,Route } from 'react-router-dom';
// import { receiveInstrument } from '../../actions/instrument_actions'
import { clearRoom } from '../../actions/room_actions'
import { connect } from 'react-redux'

class MainPage extends React.Component {
  constructor(props) {
    super(props)
  }

  // componentDidUpdate() {
  //   this.props.clearRoom()
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
    clearRoom: () => dispatch(clearRoom()),

    // receiveInstrument: instrument => dispatch(receiveInstrument(instrument)),
  }
}

export default connect(null, mDTP)(MainPage);
