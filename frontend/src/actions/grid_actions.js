
export const RECEIVE_GRID = 'RECEIVE_GRID';
export const RECEIVE_GRIDS = 'RECEIVE_GRIDS';

export const receiveGrid = grid => ({
  type: RECEIVE_GRID,
  grid
});

export const receiveGrids = grids => ({
  type: RECEIVE_GRIDS,
  grids
});

// thunk action?

