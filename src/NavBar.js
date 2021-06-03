import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";
/**
 * NavBar
 *  Props: currentUser, loginFromForm, registerFromForm, logout
 * 
 * will render full navBar if current user is defined(logged in)
 * will only render login/signup buttons if no currentUser
 */

function NavBar({ token, currentUser, logout }) {

  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <NavLink className="text" exact to="/">
        Jobly
      </NavLink>
      {
        (token !== "") ?
        <div>
        <NavLink className="text" exact to="/companies">
          Companies
        </NavLink>
        <NavLink className="text" exact to="/jobs">
          Jobs
        </NavLink>
        <NavLink className="text" exact to="/profile">
          Profile
        </NavLink>
        <NavLink className="text" exact to="/logout">
          <span onClick={logout}>Logout</span>
        </NavLink>
        </div>
        :
        <div>
        <NavLink className="text" exact to="/login">
          Login
        </NavLink>
        <NavLink className="text" exact to="/signup">
          Sign up
        </NavLink>
        </div>
      }
    </nav>

  )
}

export default NavBar;