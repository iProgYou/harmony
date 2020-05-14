import React from 'react';
import { connect } from 'react-redux';
import { receiveGrid, receiveGrids } from '../../actions/grid_actions';
import { samplerReadableNotes } from '../../reducers/selectors';
import Room from './room';

const mapSTP = (state, ownProps) => {
    let mainGridNotes;
    if (!state.entities.room) return null;
    if (!state.entities.grids[ownProps.instrument]) {
        mainGridNotes = null
    } else {
        mainGridNotes = state.entities.grids[ownProps.instrument].notes
    };
    return {
        // allNotes: samplerReadableNotes(state,state.entities.rooms[ownProps.match.params.roomId])
        allNotes: samplerReadableNotes(state,state.entities.room),
        instrument: ownProps.instrument,
        mainGridNotes: mainGridNotes
    }
};

const mapDTP = dispatch => {

    return{
        receiveGrid: grid => dispatch(receiveGrid(grid)),
        receiveGrids: grids => dispatch(receiveGrids(grids))
    }
}

export default connect(mapSTP,mapDTP)(Room);