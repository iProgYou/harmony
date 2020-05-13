import { combineReducers } from 'redux';
import users from './entities/users_reducer';
import jams from './entities/jams_reducer';
import grids from './entities/grids_reducer';
import rooms from './entities/rooms_reducer';

const EntitiesReducer = combineReducers({
    users,
    jams,
    grids,
    rooms
});

export default EntitiesReducer;

