import {
  Route,
  Redirect
} from 'react-router-dom';

const PrivateRoute = ({ component: Component, cond, ...rest }) => (
  <Route {...rest}  render={(props) => (
    localStorage.getItem("authToken") == "2" ? (
      <Component {...props} />
    ) : (
      <Redirect to = "/login" />
    )
  )} />
)

export default PrivateRoute;