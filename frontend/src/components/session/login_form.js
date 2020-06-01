import React from 'react';
import { withRouter } from 'react-router-dom';
import formStyle from './form.module.css';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      handle: '',
      password: '',
      errors: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
  }

  // Once the user has been authenticated, redirect to the current page
  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser === true) {
      this.props.history.push('/');
    }

    // Set or clear errors
    this.setState({ errors: nextProps.errors })
  }

  // Handle field updates (called in the render method)
  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  // demo login ghost typewriter
  demoLogin(e) {
    e.preventDefault();
    const { login } = this.props;

    const handleInput = document.getElementById('');
    const passwordInput = document.getElementById('');

    const demoHandle = "HarmonyDemoUser";
    const demoPass = "12345678";


  }

  // Handle form submission
  handleSubmit(e) {
    e.preventDefault();

    let user = {
      handle: this.state.handle,
      password: this.state.password
    };

    this.props.login(user)
  }

  // Render the session errors if there are any
  renderErrors() {
    return (
      <ul>
        {Object.keys(this.state.errors).map((error, i) => (
          <li key={`error-${i}`}>
            {this.state.errors[error]}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div className={formStyle.formcontainer}>
        <div className={formStyle.placeholder}></div>
        <form onSubmit={this.handleSubmit} className={formStyle.form}>
          <div className={formStyle.formHeader}>Login</div>
          <br />
          <br />

          <div>
            <div className={formStyle.formInputText}>Handle</div>
            <input 
              type="text"
              value={this.state.handle}
              onChange={this.update('handle')}
              placeholder="Type your handle"
              className={formStyle.formInput}
            />

            <br />
            <br />

            <div className={formStyle.formInputText}>Password</div>
            <input type="password"
              value={this.state.password}
              onChange={this.update('password')}
              placeholder="Type your password"
              className={formStyle.formInput}
            />

            <br />
            <br />
            <br />

            <input 
              type="submit" 
              value="Submit"
              className={formStyle.formSubmitButton}
            />

            <button
              className={formStyle.formSubmitButton}
              onClick={this.demoLogin}
            >
              Demo Login
            </button>
          
            {this.renderErrors()}
          </div>

        </form>

        <div className={formStyle.placeholder}></div>
      </div>
    );
  }
}

export default withRouter(LoginForm);