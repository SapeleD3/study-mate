import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'

class Navigation extends Component {
  render() {
    return (
      <div> 
          <NavLink to='/'>Home</NavLink>
        </div>
    );
  }
}

export default Navigation;
