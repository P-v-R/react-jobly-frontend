import React from "react";
import { NavLink } from "react-router-dom";
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
    <nav className="navbar navbar-expand-lg navbar-light">
      <NavLink className="nav-link" exact to="/">
        Jobly
      </NavLink>
      <NavLink className="nav-link" exact to="/companies">
        Companies
      </NavLink>
      <NavLink className="nav-link" exact to="/jobs">
        Jobs
      </NavLink>
      <NavLink className="nav-link" exact to="/login">
        Login
      </NavLink>
      <NavLink className="nav-link" exact to="/profile">
        Profile
      </NavLink>
      <NavLink  className="nav-link" exact to="/logout?">
        Logout
      </NavLink>
    </nav>
      
  )
}

export default NavBar;