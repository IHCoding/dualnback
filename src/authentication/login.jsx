import React from "react";
import { userService } from "../services/userService";
import { Redirect } from "react-router-dom";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        email: "",
        password: ""
      },
      submitted: false,
      errorMessage: ""
    };

    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [name]: value
      }
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({ submitted: true });
    const { user } = this.state;
    if (user.email && user.password) {
      this.login(user);
    }
  }

  async login(user) {
    console.log(user);
    var res = await userService.login(user.email, user.password);
    this.setState({ errorMessage: res.message });
    if (res.message === "Success") {
      localStorage.setItem("token", res.token);
      this.props.setLoggedIn();
    }
  }

  renderRedirect() {
    if (this.props.loggedIn) {
      return <Redirect to="/" />;
    }
  }

  render() {
    const { user, submitted } = this.state;
    return (
      <div className="col-md-6 col-md-offset-3">
        {this.renderRedirect()}
        <p>{this.state.errorMessage}</p>
        <h2>Login</h2>
        <form name="form" onSubmit={this.handleSubmit}>
          <div
            className={
              "form-group" + (submitted && !user.email ? " has-error" : "")
            }
          >
            <label htmlFor="email">E-mail</label>
            <input
              type="text"
              className="form-control"
              name="email"
              value={user.email}
              onChange={this.handleChange}
            />
            {submitted && !user.email && (
              <div className="help-block">E-mail is required</div>
            )}
          </div>
          <div
            className={
              "form-group" + (submitted && !user.password ? " has-error" : "")
            }
          >
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={user.password}
              onChange={this.handleChange}
            />
            {submitted && !user.password && (
              <div className="help-block">Password is required</div>
            )}
          </div>
          <div className="form-group">
            <button className="btn btn-primary">Login</button>
          </div>
        </form>
      </div>
    );
  }
}

export default LoginPage;
// https://stackoverflow.com/questions/52549655/react-register-form
