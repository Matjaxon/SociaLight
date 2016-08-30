import React from 'react';
import { Link, hashHistory } from 'react-router';

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
    if (this.props.loggedIn) hashHistory.push("/");
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
              type="text"
              value={this.state.email}
              onChange={this.handleChange("email")} />
          </label>

          <label>
            Phone Number:
            <input
              type="text"
              value={this.state.phone_number}
              onChange={this.handleChange("phone_number")} />
          </label>
        </div>
      );
    }

    return(
      <form className="session-form" onSubmit={this.handleSubmit}>
        Welcome to SociaLight!
        <div className="session-form-fields">
          <label>
            Username:
            <input
              type="text"
              value={this.state.username}
              onChange={this.handleChange("username")} />
          </label>

          <label>
            Password:
            <input
              type="password"
              value={this.state.password}
              onChange={this.handleChange("password")} />
          </label>
        </div>

        {emailAndPhone}

        <input type="submit" value={this.props.formType} />
      </form>
    );
  }
}

export default SessionForm;
