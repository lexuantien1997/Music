import React, { Component } from 'react';
import Login from "./demo _restful/Login";
import HomePage from "./demo _restful/HomePage";
// import PrivateRoute from "./demo _restful/PrivateRoute";

import { BrowserRouter as Router, Route, Link, Switch,Redirect, withRouter } from 'react-router-dom'

const fakeAuth = {
  isAuthenticated: false
}


class ddd extends Component { 
  render() {
    return(
      <div>lalalala</div>
    )
  }
}

class error extends Component { 
  render() {
    return(
      <div>error</div>
    )
  }
}

const PR = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    localStorage.getItem("authToken") == "true"
      ? <Component {...props} />
      : <Redirect to = '/login' />
  )} />
)

class App extends Component {
  constructor(props) {
    super(props);
    
  }
  render() {
    return (
      <Router >
        <div>
          <Route exact path="/" component={Login}/>
          <Route path="/login" component={Login}/>
          <PR path="/search" component={HomePage} />
        </div>
      </Router>
    );
  }
}

export default App;