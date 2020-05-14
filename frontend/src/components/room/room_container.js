import React from 'react';
import { connect } from 'react-redux';
import { receiveGrid, receiveGrids } from '../../actions/grid_actions';
import { samplerReadableNotes } from '../../reducers/selectors';
import Room from './room';

const mapSTP = (state, ownProps) => {

    return {
        // allNotes: samplerReadableNotes(state,state.entities.rooms[ownProps.match.params.roomId])
        allNotes: samplerReadableNotes(state,state.enties.rooms),
        // instrument
        // mainGridNotes

    }
};

const mapDTP = dispatch => {

    return{
        receiveGrid: grid => dispatch(receiveGrid(grid))
    }
}

export default connect(mapSTP,mapDTP)(Room);