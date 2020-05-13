const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
  host: {
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

  // possible future additions
  // 1. members - which should be capped at 4
  // 2. length of jam - all members should have the same jam length
  // 3. jam
  
});

module.exports = Room = mongoose.model('Room', RoomSchema);
