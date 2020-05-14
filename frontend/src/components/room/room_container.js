import React from 'react';
import { connect } from 'react-redux';
import { receiveGrid, receiveGrids } from '../../actions/grid_actions';
import { receiveRoom } from '../../actions/room_actions';
import { samplerReadableNotes, getAllMiniNotes } from '../../reducers/selectors';
import Room from './room';

const mapSTP = (state, ownProps) => {
    let mainGridNotes;
    if (!state.entities.room) return null;
    if (!state.entities.grids[ownProps.instrument]) {
        let beatArr = []
        let beats = ownProps.match.params.cols;
        for (let i = 0; i < beats; i++) beatArr.push("");
        mainGridNotes = beatArr;
    } else {
        mainGridNotes = state.entities.grids[ownProps.instrument].notes
    };
    return {
        // allNotes: samplerReadableNotes(state,state.entities.rooms[ownProps.match.params.roomId])
        allNotes: samplerReadableNotes(state,state.entities.room),
        getAllMiniNotes: (instrument) => getAllMiniNotes(state, instrument),
        // instrument: ownProps.instrument,
        availableInstruments: ["keyboard","piano","drums", "bass"],
        mainGridNotes: mainGridNotes
    }
};

const mapDTP = dispatch => {

    return{
        receiveRoom: room => dispatch(receiveRoom(room)),
        receiveGrid: grid => dispatch(receiveGrid(grid)),
        receiveGrids: grids => dispatch(receiveGrids(grids))
    }
}

export default connect(mapSTP,mapDTP)(Room);