// grid = id: { id: 0, notes: [], instrument: "", beats: 0 }

import { RECEIVE_GRID, RECEIVE_GRIDS } from "../../actions/grid_actions";
import {CLEAR_ROOM} from '../../actions/room_actions'


const gridReducer = (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_GRIDS:
      return Object.assign({}, action.grids)
    case RECEIVE_GRID:
      return Object.assign({}, state, {
        [action.grid.userId]: action.grid
      });
    case CLEAR_ROOM:
      return Object.assign({})
    default:
      return state;
  }
};
// perhaps add a clear grid action.type


export default gridReducer;