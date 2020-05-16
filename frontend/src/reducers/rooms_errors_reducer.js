import {
  RECEIVE_ROOM_ERRORS,
} from '../actions/room_actions';

const _nullErrors = [];

const roomsErrorsReducer = (state = _nullErrors, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ROOM_ERRORS:
      return action.errors;
    default:
      return state;
  }
};

export default roomsErrorsReducer;