import React from 'react';
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom';
import styles from './navbar.module.css';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.logoutUser = this.logoutUser.bind(this);
    this.getLinks = this.getLinks.bind(this);
  }

  logoutUser(e) {
    e.preventDefault();
    this.props.logout();
    this.props.history.push('/');
  }

  // Selectively render links dependent on whether the user is logged in
  getLinks() {
    if (this.props.loggedIn) {
      return (
        <div className={styles.userLinks}>
          <Link to={'/profile'}>Profile</Link>
          <button onClick={this.logoutUser}>Logout</button>
        </div>
      );
    } else {
      return (
        <div className={styles.userLinks}>
          <Link to={'/signup'}>Signup</Link>
          <Link to={'/login'}>Login</Link>
        </div>
      );
    }
  }

  render() {
    return (
      <div className={styles.navbar}>
        <div className={styles.joinDiv}>
          <h2 className={styles.joinRoom}> Join a room</h2> 
        </div>
        <h1>Harmony</h1>
        {this.getLinks()}
      </div>
    );
  }
}

export default withRouter(NavBar);