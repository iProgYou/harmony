[![alt text](https://github.com/iProgYou/harmony/blob/master/frontend/public/harmony_logo.png "Go to Harmony")](https://harmony-music.herokuapp.com/)
:----------------:
**a collaborative music creation experience**

[William Sexton](https://github.com/williamsexton/) - [Charles Coombs-Esmail](https://github.com/ccoombsesmail) - [Isaac Yoon](https://github.com/isaac-yoon) - [Zack Barbieri](https://github.com/iProgYou/)


Harmony was an idea that was formed in the midst of the Covid-19 crisis. We wanted to figure out how people could make music together while they are apart. Harmony is an application where you can join with friends and create music with consistent playback.  

Key Features
* Create musical compositions solo or with friends using up to 4 instruments (bass, piano, keyboard, and drums)
  - display musical compositions with an appealing UI/UX design that updates real-time across multiple platforms
  - play, pause, or playback musical compositions
* Secure authentication for user signup/login
* Room Features: users can create, destroy, and join rooms where they can make music
* Chatting: users can chat with other users that are in the same room

### Technologies

- Frontend: React, Redux, Webpack
- Backend: Node.js, Socket.io/WebSockets
- Database: MongoDB
- Hosting: Heroku


[How To Use](https://www.youtube.com/watch?v=mPL3O47iZsg)

When you open the sight you will notice several grids. Feel free to play around with these as much as you want, but the real fun starts when you get other people involved. Create an account so you can then create a room. When creating a room you will need to type a name and select how many beats you want to have. Once you enter a room you will be prompted to select an instrument and then you can start jamming! To play with others, have them join the room with the name you used. Use the Play All button to play all of the notes that everyone has written on their instruments.

<!-- Under the Hood -->


### Playback and Real-Time User Interaction

Harmony makes use of the Tone.js library with its Transport time keeping facilities to allow for playback of user input. Both single instrument and multiple instrument playback are supported, along with pause, restart and loop functionality. The primary function used for playback is the Tone provided scheduleRepeat function, which will fire periodically. In the code below, it is set to repeat every eigth note (8n). The input to the start button for playback is a boolean which determines whether the playback will loop indefinitely.

```javascript
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
```
The handle start function also triggers the animateNote function every iteration. This highlights the column currently being played, and is always in sync with the note being played as it is called within the same schedule repeat function. A few state variables are also controlled to handle pausing and restarting. The notes to be played come from the allNotes prop, which is an array containing all the user inputs.

## WebSockets

Synchronizing grid state across clients in real-time was accomplished using WebSockets via the Socket.io library. As seen in the code below, the grid state along with some other data is captured from te state and props, and then emitted upon each user interaction with their own grid. Once receiving, this updated grid state is broadcasted to all other users. The roomname is used for scoping, so that only the users in the same room receiving the broadcast. This updated state is then put into each clients global Redux state.

```javascript
// on the frontend on each click of a note
 let grid = {
      notes: this.state.selected,
      instrument: this.props.instrument,
      userId: this.props.currentUserId,
      beats: this.props.beats,
      room: this.props.match.params.roomName
    }
    this.props.socket.emit('grid update', grid);

// on the fronted to receive a broadcast
 this.props.socket.on('grid update', (grid) => {
      this.props.receiveGrid(grid)
  });

// on the backend
 socket.on('grid update', (data) => {
    io.to(data['room']).emit('grid update', data);
  });

```


Future Updates
* Add save functionality to created musical compositions
* Implement an index page for past, created musical compositions
* More instruments and notes

