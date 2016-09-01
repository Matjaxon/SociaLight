import React from 'react';
import { Link, withRouter } from 'react-router';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      phone_number: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(key) {
    return (event) => this.setState({[key]: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.props.formType === 'login') {
      this.props.processForm(
        {user: {username: this.state.username,
                password: this.state.password}}
      );
    } else {
      this.props.processForm({user: this.state});
    }
  }

  componentDidUpdate() {
    this.redirectIfLoggedIn();
  }

  redirectIfLoggedIn() {
    if (this.props.loggedIn) this.props.router.replace("/");
  }

  render () {

    let emailAndPhone;
    if (this.props.formType === "login") {
      emailAndPhone = "";
    } else {
      emailAndPhone = (
        <div className="session-form-fields">
          <label>
            Email:
            <input
              className="session-form-input"
              type="text"
              value={this.state.email}
              onChange={this.handleChange("email")} />
          </label>

          <label>
            Phone Number:
            <input
              className="session-form-input"
              type="text"
              value={this.state.phone_number}
              onChange={this.handleChange("phone_number")} />
          </label>
        </div>
      );
    }

    let buttonName, altAction;
    if (this.props.formType === "login") {
      buttonName = "Login";
      altAction = <Link to='/signup'>or Sign Up</Link>;
    } else {
      buttonName = "Sign Up";
      altAction = <Link to='/login'>or Login</Link>;
    }

    return(
      <div className="form-container">
        <h2>Welcome to SociaLight!</h2>
        <form className="session-form" onSubmit={this.handleSubmit}>
          <div className="session-form-fields">
            <label>
              Username:
              <input
                className="session-form-input"
                type="text"
                value={this.state.username}
                onChange={this.handleChange("username")} />
            </label>

            <label>
              Password:
              <input
                className="session-form-input"
                type="password"
                value={this.state.password}
                onChange={this.handleChange("password")} />
            </label>
          </div>

          {emailAndPhone}

          <input type="submit" className="submit-button" value={buttonName} />

          <span className="alt-session-action">{altAction}</span>

        </form>
      </div>
    );
  }
}

export default withRouter(SessionForm);
