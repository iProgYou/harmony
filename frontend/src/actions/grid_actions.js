
export const RECEIVE_GRID = 'RECEIVE_GRID';
export const RECEIVE_GRIDS = 'RECEIVE_GRIDS';

// grid = id: { id: 0, notes: [...], instrument: 'piano', beats: 0 }


export const receiveGrid = grid => ({
  type: RECEIVE_GRID,
  grid
});

// export const receiveGrids = grids => ({
//   type: RECEIVE_GRIDS,
//   grids
// });

// how do we send the state of our grid to other users?
// pass grid objects through websockets


