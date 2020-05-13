const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Jam = require('../../models/Jam');
const validateJamInput = require('../../validation/jams');


// Get all Jams
router.get('/', (req, res) => {
  Jam.find()
    .sort({ date: -1 })
    .then(jam => res.json(jam))
    .catch(err => res.status(404).json({ nojamsfound: 'No jams found' }));
});


// This would retrieve a single user's Jams
// router.get('/user/:user_id', (req, res) => {
//   Jam.find({ authorId: req.params.author_id })
//     .then(jams => res.json(jams))
//     .catch(err =>
//       res.status(404).json({ nojamsfound: 'No jams found from that user' }
//       )
//     );
// });


// This would retrieve an individual's Jams
router.get('/:id', (req, res) => {
  Jam.findById(req.params.id)
    .then(jam => res.json(jam))
    .catch(err =>
      res.status(404).json({ nojamfound: 'No jam found with that ID' })
    );
});


// This would create a protected route for a user to post Jams
router.post('/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateJamInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newJam = new Jam({
      authorId: req.user.id,
      name: req.body.name,
      // grids: [GridSchema] <- this should come from the page
    });

    newJam.save().then(jam => res.json(jam));
  }
);


module.exports = router;