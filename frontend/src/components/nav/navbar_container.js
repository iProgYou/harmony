import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import { createRoom, fetchRoom } from '../../actions/room_actions';
import { receiveErrors } from '../../actions/room_actions';
import NavBar from './navbar';

const mapStateToProps = state => ({
  loggedIn: state.session.isAuthenticated,
  errors: state.errors.rooms
});

const mapDispatchToProps = dispatch => {

  return{
    logout: () => dispatch(logout()),
    createRoom: room => dispatch(createRoom(room)),
    fetchRoom: roomName => dispatch(fetchRoom(roomName)),
    receiveErrors: err => dispatch(receiveErrors(err))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);