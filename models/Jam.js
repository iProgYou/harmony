const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
  note: {
    type: String
  }
})

const GridSchema = new Schema({
  instrument: {
    type: String, 
  }, 
  notes: [NoteSchema]
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