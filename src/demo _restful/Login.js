import React, { Component } from 'react';
// import "./login.css";
import axios from "axios";
class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmitLogin(e) {
    e.preventDefault();
    const { username, password } = this.state;
    axios
      .post("http://localhost:5000/login", {username, password})
      .then( res => {
        let { data } = res;
        if(data.success) { 
          localStorage.setItem("authToken",true); 
          window.location.href = 'home';
        }
        else alert(data.error);
      });
  }
  render() {
    return (
      <div className="login-page">
        <div className="form">
          <form onSubmit={this.onSubmitLogin.bind(this)} className="login-form">
            <input onChange={this.onChange.bind(this)} name = "username" type="text" placeholder="username" />
            <input  onChange={this.onChange.bind(this)} name = "password" type="password" placeholder="password" />
            <button type="submit">login</button>
            <p className="message">Not registered? <a href="#">Create an account</a></p>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;