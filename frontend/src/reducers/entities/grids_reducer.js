// grid = id: { id: 0, notes: [], instrument: "", beats: 0 }

import { RECEIVE_GRID } from "../../actions/grid_actions";


const gridReducer = (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_GRID:
      return Object.assign({}, state, {
        [action.grid.instrument]: action.grid
      });
    default:
      return state;
  }
};
// perhaps add a clear grid action.type


export default gridReducer;