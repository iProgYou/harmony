import React from 'react';
// import KeyboardGrid from '../single_grid/keyboard_grid'
// import PianoGrid from '../single_grid/piano_grid'
// import DrumGrid from '../single_grid/drum_grid'
import BassGrid from '../single_grid/bass_grid'
import styles from './main.module.css'
import ChatRoom from '../chat/chat_room'

class MainPage extends React.Component {

  render() {
    return (
      <div>
        <BassGrid
          cols={8}
        />
        <ChatRoom> </ChatRoom>
        <h1 className={styles.blurb}>Make Music</h1>
        <footer className={styles.footer}>
          Copyright &copy; 2020 Harmony
        </footer>
      </div>
    );
  }
}

export default MainPage;
