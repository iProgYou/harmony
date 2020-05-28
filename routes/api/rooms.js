const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Room = require('../../models/Room');
const validateRoomInput = require('../../validation/room');

router.get('/', (req, res) => {
  Room.find()
    .sort({ date: -1 })
    .then(room => res.json(room))
    .catch(err => res.status(404).json({ noroomsfound: 'No rooms found' }));
});

router.get('/user/:user_id', (req, res) => {
  Room.find({ user: req.params.user_id })
    .then(room => res.json(room))
    .catch(err =>
      res.status(404).json({ noroomsfound: 'No rooms found from that user' }
      )
    );
});

router.get('/:id', (req, res) => {
  Room.findById(req.params.id)
    .then(room => res.json(room))
    .catch(err =>
      res.status(404).json({ noroomfound: 'No room found with that ID' })
    );
});

router.post('/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateRoomInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newRoom = new Room({
      name: req.body.name,
      hostId: req.user.id,
      beats: req.body.beats,
      // memberIds: [req.user.id]
      // more additions to come?
    });

    newRoom.save()
      .then(room => res.json(room))
      // .then(room => console.log("success"))
      .catch(err => console.log(err));
  }
);

router.patch('/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    console.log(req.body.roomId);
    // could not do the Room.update method outlined in MongoDB docs
    // possibly due to websockets
    Room.findById(req.body.roomId, (err, room) => {
      if (room) {
        room.memberIds.push(req.body.userId);
        const updatedRoom = room.save().then((room) => {
          console.log(res.json(room))
          return res.json(room)
        }).catch(() => console.log('room was not updated'));
      } else {
        console.log('Room was not found');
        res.send('Room not found');
      }
    })
  }
);
// "Proxy error: Could not proxy request /api/rooms/5ecff8e17064d743f78a334f from localhost:3000 to http://localhost:5000 (ECONNRESET)."
// $.ajax({
//   url: `/api/posts/${}`
// })

// 

module.exports = router;