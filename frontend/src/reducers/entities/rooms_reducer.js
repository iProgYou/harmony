import {
  RECEIVE_ROOMS,
  RECEIVE_ROOM
} from "../../actions/room_actions";

// room = id: { id: 0, hostId: 0, jamId:  }

const roomsReducer = (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_ROOMS:
      return Object.assign({}, action.rooms);
    case RECEIVE_ROOM:
      return Object.assign({}, state, {[action.room.id]:action.room});
    default:
      return state;
  }
};

export default roomsReducer;