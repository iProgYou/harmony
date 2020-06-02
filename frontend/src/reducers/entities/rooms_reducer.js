import {
  RECEIVE_ROOMS,
  RECEIVE_ROOM,
  CLEAR_ROOM
} from "../../actions/room_actions";

// room = id: { id: 0, hostId: 0, jamId:  }

const roomsReducer = (state = {}, action) => {
  Object.freeze(state);
 
  switch (action.type) {
    case RECEIVE_ROOM:
      return Object.assign({}, action.room);
    case CLEAR_ROOM:
      return Object.assign({})
    default:
      return state;
  }
};

export default roomsReducer;