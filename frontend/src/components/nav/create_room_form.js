import React from 'react';
import styles from './navbar.module.css';
import { Link, withRouter } from 'react-router-dom';

class RoomForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      beats: 8,
      // errors: {}
    };

    // this.handleSubmit = this.handleSubmit.bind(this);
    // this.renderErrors = this.renderErrors.bind(this);
  }

  // Once the user has been authenticated, redirect to the current page
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.currentUser === true) {
  //     this.props.history.push('/profile');
  //   }

    // Set or clear errors
    // this.setState({ errors: nextProps.errors })
  // }

  // Handle field updates (called in the render method)
  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  // Handle form submission
  handleSubmit(e) {
    e.preventDefault();
    const {name, beats} = this.state
    let room = { name, beats };
    console.log(`room ${name} created with ${beats} beats`)
    this.props.history.push(`/rooms/${this.state.name}/${this.state.beats}`)
    this.props.hideModal()
    // dispatch receiveRoom(cols)

    // this.props.login(user)
    // this.props.history.push('/profile');
  }

  // Render the session errors if there are any
  // renderErrors() {
  //   return (
  //     <ul>
  //       {Object.keys(this.state.errors).map((error, i) => (
  //         <li key={`error-${i}`}>
  //           {this.state.errors[error]}
  //         </li>
  //       ))}
  //     </ul>
  //   );
  // }

  render() {
    let options = [] 
    for (let i=8; i <= 64; i*=2){
      options.push(<option value = {i}> {i} beats </option>)
    }

    return (
      
      <div className={styles.outerModal} id="modal-form" onClick={e=> (e.target===e.currentTarget) ? this.props.hideModal() : undefined}>
        <div className={styles.innerModal}> 
              <div onClick={()=>this.props.hideModal()} className={styles.xIcon}> X </div>
              <h1 className={styles.formBlurb}> Create a Room </h1>
          <form className={styles.actualForm} onSubmit={(e) => this.handleSubmit(e)}>
            <div> <div> Room Name: </div>
              <input type="text"
                value={this.state.name}
                onChange={this.update('name')}
                placeholder="Room Name"
              />
              <br />
              <div> Jam Length: </div>
              <div className={styles.selector}>
              <select className={styles.dropdown}
              defaultValue={this.state.beats}
              onChange = {this.update('beats')}>
                {options}
              </select>
              </div>
              <br />
              {/* <Link to={`/rooms/${this.state.name}/${this.state.beats}`}> */}
                <button className={styles.joinRoom} type="submit" >Harmonize </button>
              {/* </Link> */}
              {/* {this.renderErrors()} */}
            </div>
          </form>
        </div>
      </div>

    );
  }
}

export default withRouter(RoomForm);