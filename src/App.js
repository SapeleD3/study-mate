import React, {Component} from 'react';
import { 
  BrowserRouter as Router, 
  Route, Switch, 
  Link, 
  Redirect,
  withRouter
} 
from 'react-router-dom';
// import Home from './component/Home'
// import Error from './component/Error'
// import Navigation from './component/Navigation'

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100)
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
}

const Public = () => <h1>Public</h1>
const Protected = () => <h1>Protected</h1>

class Login extends Component {
  state = {
    redirectToReferrer: false
  }

  login = () => {
    fakeAuth.authenticate(() => {
      this.setState(() => ({
        redirectToReferrer: true
      }))
    })
  }
  render() {
    const {redirectToReferrer} = this.state 
    const {from} = this.props.location.state || { from: {pathname: '/'}}

    if (redirectToReferrer === true) {
      return (
        <Redirect to={from} />
      )
    }
    return (
      <div>
        <p>You Must Login to view this Page at {from.pathname}</p>
        <button onClick={this.login}>Log in</button>
      </div>
    );
  }
}

const PrivateRoute = ({component: Component, ...rest}) => (
  <Route {...rest} render={(props) => (
    fakeAuth.isAuthenticated === true ?
     <Component {...props}/> :
     <Redirect to={{
       pathname: '/login',
       state: {from: props.location}
     }} />
  )}/>
)

const AuthButton = withRouter(({history}) => (
  fakeAuth.isAuthenticated === true ? 
  <p>Welcome! <button onClick={() => {
    fakeAuth.signout(() => history.push('/'))
  }} >Sign Out</button> </p>
  : <p>you are not logged in</p>
))

function App() {
  return (
    <Router>
      <div>
        <AuthButton />
        <ul>
          <li><Link to='/public'>Public Page</Link></li>
          <li><Link to='/protected'>Protected Page</Link></li>
        </ul>

        <Route path='/public' component={Public} />
        <Route path='/login' component={Login} />
        <PrivateRoute path='/protected' component={Protected} />
      </div>
    </Router>
  );
}

export default App;
