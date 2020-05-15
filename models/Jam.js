const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const NoteSchema = new Schema({
//   note: {
//     type: Schema.Types.Mixed,
//     // because notes can be an array or a string
//     // increased flexibility comes at a cost, harder to maintain
//   }
// })

const GridSchema = new Schema({
  instrument: {
    type: String, 
  }, 
  notes: {
    type: Array
  }, 
  beats: {
    type: Number
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  }
  // notes: [NoteSchema],
})

const JamSchema = new Schema({
  authorId: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }, 
  grids: [GridSchema]
});

module.exports = Jam = mongoose.model('Jam', JamSchema);