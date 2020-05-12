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
      user: req.user.id
      // more additions to come
    });

    newRoom.save().then(room => res.json(room));
  }
);

module.exports = router;