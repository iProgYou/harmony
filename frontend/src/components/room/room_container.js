import React from 'react';
import { connect } from 'react-redux';
import { receiveGrid, receiveGrids } from '../../actions/grid_actions';
import { receiveRoom } from '../../actions/room_actions';
import { samplerReadableNotes, getAllMiniNotes } from '../../reducers/selectors';
import Room from './room';

const mapSTP = (state, ownProps) => {
    // let mainGridNotes;
    // if (!state.entities.room) return null;
    // if (!state.entities.grids[ownProps.instrument]) {
    //     let beatArr = []
    //    let beats = ownProps.match.params.beats;
    //     for (let i = 0; i < beats; i++) beatArr.push("");
    //     mainGridNotes = beatArr;
    // } else {
    //     mainGridNotes = state.entities.grids[ownProps.instrument].notes
    // };

    let mainGridNotes;
    if (state.entities.grids[state.session.user.id]) {
        mainGridNotes = state.entities.grids[state.session.user.id].notes
    } else {
        mainGridNotes = null;
    }
    return {
        // allNotes: samplerReadableNotes(state,state.entities.rooms[ownProps.match.params.roomId])
        currentRoom: state.entities.room,
        currentRoomId: state.entities.room.id, 
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
        updateRoom: (userId, roomId) => dispatch(updateRoom(userId,roomId)),
        receiveGrids: grids => dispatch(receiveGrids(grids))
    }
}

export default connect(mapSTP,mapDTP)(Room);