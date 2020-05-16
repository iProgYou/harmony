import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import { createRoom } from '../../actions/room_actions';

import NavBar from './navbar';

const mapStateToProps = state => ({
  loggedIn: state.session.isAuthenticated,
});

const mapDispatchToProps = dispatch => {

  return{
    logout: () => dispatch(logout()),
    createRoom: room => dispatch(createRoom(room))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);