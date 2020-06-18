import React from 'react';
import QuadGrid from './quad_grid';
import AboutPage from './about_page'
import { ProtectedRoute } from '../../util/route_util';
import RoomContainer from '../room/room_container';
import styles from './main.module.css'
import { Switch, Route, Link } from 'react-router-dom';
// import { receiveInstrument } from '../../actions/instrument_actions'
import { clearRoom } from '../../actions/room_actions'
import { connect } from 'react-redux'
import Welcome from './welcome_modal/welcome';

class MainPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showWelcome: !props.isLoggedIn
    }

    this.closeModal = this.closeModal.bind(this)
  }

  // componentDidUpdate() {
  //   this.props.clearRoom()
  // }

  closeModal() {
    this.setState({showWelcome: false})
  }


  render() {
    return (
      <div>
        {
          this.state.showWelcome ? <Welcome closeModal={this.closeModal} /> : null
        }
        <Switch>
          <Route path="/about" component={() => <AboutPage />} />
          <ProtectedRoute path="/rooms/:roomName/" component={(props) => <RoomContainer socket = {this.socket}  {...props}/>} />
          <Route path="/" component={() => <QuadGrid beats={8}/>} />
        </Switch>

        <h1 className={styles.blurb}>Make Music</h1>
        <footer className={styles.footer}>
          <Link className={styles.aboutLink} to="/about">About Us</Link>
          <br />
          <div>Copyright &copy; 2020 Harmony</div>
        </footer>
      </div>
    );
  }
}

const mSTP = state => {
  
  return{
    isLoggedIn: state.session.isAuthenticated 
  }
}

const mDTP = dispatch => {

  return {
    clearRoom: () => dispatch(clearRoom()),

    // receiveInstrument: instrument => dispatch(receiveInstrument(instrument)),
  }
}

export default connect(mSTP, mDTP)(MainPage);
