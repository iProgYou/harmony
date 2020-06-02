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

// Find room by name
router.get('/:roomName', (req, res) => {
  Room.find({name: req.params.roomName})
    .then(room => res.json(room))
    .catch(err =>
      res.status(404).json({ noroomfound: 'No room found with that ID' })
    );
});

router.post('/', passport.authenticate('jwt', { session: false }), 
  (req, res) => {
    const { errors, isValid } = validateRoomInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    Room.findOne({ name: req.body.name })
      .then(room => {
        if (room) {
          return res.status(422).json({name: "A room with that name already exists" })
        } else {
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
      })
  }
);

router.patch('/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Room.findById(req.body.roomId, (err, room) => {
      if (room && !req.body.removeId) {
        room.memberIds.push(req.body.userId);
        
        room.save()
          .then((room) => {
            return res.json(room)
          })
          .catch(() => console.log('room was not updated'));
          } else if (room && req.body.removeId ) {
            room.memberIds = room.memberIds.splice(room.memberIds.indexOf(room.userId), 1)
            room.save()
            .then((room) => {
              return res.json(room)
            })
            .catch(() => console.log('room was not updated'));
          } else {
            res.send('Room not found');
          }
    })
  }
);

router.delete('/:roomId', passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Room.findById(req.body.roomId), (err, room) => {
      if (room) {
        room.delete();
      } else {
        res.send('room was not found');
      }
    }
  }
)

module.exports = router;