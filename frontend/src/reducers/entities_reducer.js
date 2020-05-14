import { combineReducers } from 'redux';
import users from './entities/users_reducer';
import jams from './entities/jams_reducer';
import grids from './entities/grids_reducer';
import room from './entities/rooms_reducer';

const EntitiesReducer = combineReducers({
    users,
    jams,
    grids,
    room
});

export default EntitiesReducer;

