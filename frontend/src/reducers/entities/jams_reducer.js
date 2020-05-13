import {
  RECEIVE_JAMS,
  RECEIVE_JAM
} from "../../actions/jams_actions";

//  jam = { id: { gridIds:[], userIds: [], hostId: 0 } }

const jamsReducer = (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_JAMS:
      return Object.assign({}, state, {
        [action.jams.id]: action.jams
      });
    case RECEIVE_JAM:
      return Object.assign({}, state, {
        [action.jam.id]: action.jam
      });
    default:
      return state;
  }
};

export default jamsReducer;