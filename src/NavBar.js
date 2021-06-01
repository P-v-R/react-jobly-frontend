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
    <nav className="NavBar navbar-md bg-light">
      <NavLink exact to="/">
        Jobly
      </NavLink>
      <NavLink exact to="/companies">
        Companies
      </NavLink>
      <NavLink exact to="/jobs">
        Jobs
      </NavLink>
      <NavLink exact to="/login">
        Login
      </NavLink>
      <NavLink exact to="/profile">
        Profile
      </NavLink>
      <NavLink  className="" exact to="/logout?">
        Logout
      </NavLink>
    </nav>
      
  )
}

export default NavBar;