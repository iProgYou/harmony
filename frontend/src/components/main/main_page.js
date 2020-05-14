import React from 'react';
// import KeyboardGrid from '../single_grid/keyboard_grid'
// import PianoGrid from '../single_grid/piano_grid'
// import DrumGrid from '../single_grid/drum_grid'
// import BassGrid from '../single_grid/bass_grid'

import MainGrid from '../room/room';
import MiniGrid from '../single_grid/mini_grid_partial';
import Room from '../room/room';
import styles from './main.module.css'
import ChatRoom from '../chat/chat_room'
import socketIOClient from "socket.io-client";

class MainPage extends React.Component {
  socket = socketIOClient()
  render() {
    return (
      <div>
        <Room
         socket = {this.socket}
          allNotes={[
            [ 'A2', 'A1', 'A4', 'E4' ],
            [ 'F2', 'A4' ],
            [ 'C3', 'C1', 'B4', 'E4' ],
            [ 'B3', 'A4' ],
            [ 'A2', 'A1', 'E4' ],
            [ 'F2', 'A4' ],
            [ 'C3', 'C1', 'E4', 'B4' ],
            [ 'B3', 'B4', 'D4' ]
          ]
          }
          mainGridNotes={ ["","","C#2","B1","","","C#2","B1"] }
          instrument={"piano"}
        />
        {/* <PianoGrid
          cols={ 8 }
        />
        <BassGrid
          cols={ 8 }
        />
        <DrumsGrid
          cols={ 8 }
        />
        <KeyboardGrid
          cols={ 8 }
        /> */}
        <MiniGrid cols={8} selected={["A2", "A1", "A1", "A1", "A1", "A1", "A1", "A1"]}/>
        <ChatRoom socket = {this.socket}> </ChatRoom>

        <h1 className={styles.blurb}>Make Music</h1>
        <footer className={styles.footer}>
          Copyright &copy; 2020 Harmony
        </footer>
      </div>
    );
  }
}

export default MainPage;
