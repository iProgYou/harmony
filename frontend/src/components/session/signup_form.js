import React from 'react';
import { withRouter } from 'react-router-dom';
import formStyle from './form.module.css';

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      handle: '',
      password: '',
      password2: '',
      errors: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearedErrors = false;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.signedIn === true) {
      let user = {
        handle: this.state.handle,
        password: this.state.password,
        password2: this.state.password2
      };

      this.props.login(user)
    }

    this.setState({ errors: nextProps.errors })
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let user = {
      handle: this.state.handle,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.signup(user, this.props.history)
  }

  renderErrors() {
    return (
      <ul>
        {Object.keys(this.state.errors).map((error, i) => (
          <li className={formStyle.errors} key={`error-${i}`}>
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
          
          <div className={formStyle.formCenteringBox}>
          <div className={formStyle.formHeader}>Sign Up</div>
          
     
          <div className= {formStyle.formContents}>
           

            <div className={formStyle.formInputText}>Handle:</div>
            <input type="text"
              value={this.state.handle}
              onChange={this.update('handle')}
              placeholder="Handle"
              className={formStyle.formInput}
            />

            <br />
            <br />

            <div className={formStyle.formInputText}>Password:</div>
            <input type="password"
              value={this.state.password}
              onChange={this.update('password')}
              placeholder="Password"
              className={formStyle.formInput}
            />

            <br />

            <input type="password"
              value={this.state.password2}
              onChange={this.update('password2')}
              placeholder="Confirm Password"
              className={formStyle.formInput}
            />

            <br />
            <br />

            <input 
              type="submit" 
              value="Submit"
              className={formStyle.formSubmitButton}
            />

            {this.renderErrors()}
          </div>
          </div>
        </form>

        <div className={formStyle.placeholder}></div>
      </div>
    );
  }
}

export default withRouter(SignupForm);