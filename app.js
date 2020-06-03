const express = require("express");
const app = express();
const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;

const users = require('./routes/api/users');
const rooms = require('./routes/api/rooms');
const jams = require('./routes/api/jams');

const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
// const io = require('socket.io')(http);


if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  })
}

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());

app.use(passport.initialize());
require('./config/passport')(passport);


app.use('/api/users', users);
app.use('/api/rooms', rooms);
app.use('/api/jams', jams);

const port = process.env.PORT || 5000;
const server = app.listen(port, () => console.log(`Server is running on port ${port}`));



////////////// Web Sockets ///////////////

const io = require('socket.io')(server);

io.on('connection', (socket) => {

  // socket.on('disconnect', () => {
  //   console.log(data);
  // });

  socket.on('joinRoom', (room) => {
    // console.log(`you have joined room ${room}`)
    socket.join(room);
  });

  socket.on('chat message', (data) => {
    io.to(data['room']).emit('chat message', data);
  });
  socket.on('grid update', (data) => {
    io.to(data['room']).emit('grid update', data);
  });

  socket.on('update room', data => {
    io.emit('update room', data)
  })

  socket.on('instrument update', (data) => {
    io.emit('instrument update', data);
  });

});

// io.on('connection', (socket) => {
//   console.log('a user connected');
//   socket.on('disconnect', () => {
//     console.log('user disconnected');
//   });
// });

// http.listen(3001, () => {
//   console.log('listening on *:3001');
// });