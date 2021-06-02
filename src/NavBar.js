import React from "react";
import { NavLink } from "react-router-dom";
import Nav from "react-bootstrap/Nav"
import "./NavBar.css";
/**
 * NavBar
 *  Props: currentUser
 * 
 * will render full navBar if current user is defined(logged in)
 * will only render login/signup buttons if no currentUser
 */

function NavBar(){
  
  return (
    <Nav className="navbar navbar-expand-lg navbar-light">
      <NavLink className="text" exact to="/">
        Jobly
      </NavLink>
      <NavLink className="text" exact to="/companies">
        Companies
      </NavLink>
      <NavLink className="text" exact to="/jobs">
        Jobs
      </NavLink>
      <NavLink className="text" exact to="/login">
        Login
      </NavLink>
      <NavLink className="text" exact to="/profile">
        Profile
      </NavLink>
      <NavLink  className="text" exact to="/logout?">
        Logout
      </NavLink>
    </Nav>
      
  )
}

export default NavBar;