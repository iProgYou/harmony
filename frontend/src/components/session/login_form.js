import React from 'react';
import { withRouter } from 'react-router-dom';
import FormStyle from './form.module.css';
import LoginFormStyle from './login_form.module.css';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
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

  // Handle form submission
  handleSubmit(e) {
    e.preventDefault();

    let user = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.login(user)
    this.props.history.push('/');
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
      <form onSubmit={this.handleSubmit} className={FormStyle.form}>
        <div>
          <input type="text"
            value={this.state.email}
            onChange={this.update('email')}
            placeholder="Email"
          />

          <br />

          <input type="password"
            value={this.state.password}
            onChange={this.update('password')}
            placeholder="Password"
          />

          <br />

          <input type="submit" value="Submit" />
        
          {this.renderErrors()}
        </div>
      </form>
    );
  }
}

export default withRouter(LoginForm);