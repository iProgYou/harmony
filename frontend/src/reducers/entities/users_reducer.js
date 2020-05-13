// import { RECEIVE_CURRENT_USER } from '../../actions/session_actions';

const usersReducer = (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    default:
      return state;
  }
}

export default usersReducer;