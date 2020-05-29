const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MemberSchema = new Schema({
  member: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  }
})

const RoomSchema = new Schema({
  // Should this be host?
  hostId: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  name: {
    type: String,
    required: true,
    unique: true
  },
  date: {
    type: Date,
    default: Date.now
  }, 
  beats: {
    type: Number,
    required: true
  },
  // beats or columns, they are the same thing
  savedJams: {
    type: Schema.Types.Mixed
  }, 
  memberIds : [MemberSchema]
  // memberIds should be capped at 4?
});

module.exports = Room = mongoose.model('Room', RoomSchema);
