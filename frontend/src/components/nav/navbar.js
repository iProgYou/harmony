import React from 'react';
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom';
import styles from './navbar.module.css';
import RoomForm from './create_room_form'
import SearchBar from './room_searchbar'

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.logoutUser = this.logoutUser.bind(this);
    this.getLinks = this.getLinks.bind(this);
    this.state = {formDisplay: false, searchDisplay: false};
  }

  logoutUser(e) {
    e.preventDefault();
    this.props.logout();
    this.props.history.push('/');
  }

  showModal(){
    this.setState({formDisplay:true})
  }
  hideModal(){
    const modal = document.getElementById("modal-form")
    modal.classList.add(styles.hidden)
    window.setTimeout(() => this.setState({ formDisplay: false }), 150)
  }
  showSearch(){
    this.setState({searchDisplay:true})
  }
  hideSearch(){
    const searchbar = document.getElementById(styles.searchbar)
    searchbar.classList.add(styles.hidden)
    window.setTimeout(() => this.setState({ searchDisplay: false }), 150)
  }

  toggleSearch(){
 
    this.setState({searchDisplay:!this.state.searchDisplay})
  }


  // Selectively render links dependent on whether the user is logged in
  getLinks() {
    if (this.props.loggedIn) {
      return (
        <div className={styles.userLinks}>
          <button onClick={this.logoutUser}>LOGOUT</button>
        </div>
      );
    } else {
      return (
        <div className={styles.userLinks}>
          <Link to={'/signup'}>SIGNUP</Link>
          <Link to={'/login'}>LOGIN</Link>
        </div>
      );
    }
  }

  render() {
      
      const createRoom = this.props.loggedIn ? (
        <h2 onClick={() => this.showModal()} className={styles.joinRoom}> CREATE A ROOM</h2>
      ) : (null);
    

    return (
      <div className={styles.navbar}>
        <div className={styles.joinDiv}>
          <h2  className={styles.joinRoom} onClick={(e)=> this.toggleSearch(e)}> JOIN A ROOM</h2>
          {createRoom} 
          {(this.state.searchDisplay) ?
            <SearchBar fetchRoom={this.props.fetchRoom} hideSearch = {() => this.hideSearch()}/> : null}
        </div>
        {(this.state.formDisplay) ? 
        <RoomForm
         createRoom={this.props.createRoom}
         hostId={this.props.hostId}
         hideModal ={() => this.hideModal()}
        /> : null}
          
        {(this.state.formDisplay) ? <RoomForm createRoom={this.props.createRoom} receiveErrors={this.props.receiveErrors} errors={this.props.errors}  hostId={this.props.hostId} hideModal ={()=>this.hideModal()}/> : null}
        <Link to={'/'}><h1 className={styles.title}>harmony</h1></Link>
        {this.getLinks()}
      </div>
    );
  }
}

export default withRouter(NavBar);