import React from 'react';
import { connect } from 'react-redux';
import { receiveGrid, receiveGrids } from '../../actions/grid_actions';
import { updateRoom, receiveRoom } from '../../actions/room_actions';
import { samplerReadableNotes, getAllMiniNotes } from '../../reducers/selectors';
import Room from './room';

const mapSTP = (state, ownProps) => {
    let mainGridNotes;
    if (state.entities.grids[state.session.user.id]) {
        mainGridNotes = state.entities.grids[state.session.user.id].notes
    } else {
        mainGridNotes = null;
    }
    return {
        currentRoom: state.entities.room,
        currentUserId: state.session.user.id,
        mainGridNotes,
        allNotes: samplerReadableNotes(state,state.entities.room),
        getAllMiniNotes: (instrument) => getAllMiniNotes(state, instrument),
        // instrument: ownProps.instrument,
        // availableInstruments: ["keyboard","piano","drums", "bass"],
    }
};

const mapDTP = dispatch => {

    return{
        // receiveRoom: room => dispatch(receiveRoom(room)),
        receiveGrid: grid => dispatch(receiveGrid(grid)),
        updateRoom: (roomData) => dispatch(updateRoom(roomData)),
        receiveGrids: grids => dispatch(receiveGrids(grids)),
        receiveRoom: room => dispatch(receiveRoom(room))
    }
}

export default connect(mapSTP,mapDTP)(Room);