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
    this.state = {formDisplay: false, searchbarDisplay: false};
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

  toggleSearch(){
    let searchBar=document.getElementById(styles.searchbar)
    if (!this.state.searchbarDisplay){
      searchBar.classList.add(styles.shown)
    }else{ 
      searchBar.classList.remove(styles.shown)
      searchBar.classList.add(styles.hidden)
      window.setTimeout(() => searchBar.classList.remove(styles.hidden), 200)
    }
    this.setState({searchbarDisplay:!this.state.searchbarDisplay})
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
        <h2 onClick={() => this.showModal()} className={styles.joinRoom}> CREATE A JAM</h2>
      ) : (null);
    

    return (
      <div className={styles.navbar}>
        <div className={styles.joinDiv}>
          <h2  className={styles.joinRoom} onClick={(e)=> this.toggleSearch(e)}> JOIN A JAM</h2>
          {createRoom} 
          <SearchBar/>
        </div>
        {(this.state.formDisplay) ? <RoomForm hideModal ={()=>this.hideModal()}/> : null}
        <Link to={'/'}><h1 className={styles.title}>harmony</h1></Link>
        {this.getLinks()}
      </div>
    );
  }
}

export default withRouter(NavBar);