import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { v4 as uuid } from "uuid"
import Alert from "react-bootstrap/Alert";
import { decode } from "jsonwebtoken";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompass } from "@fortawesome/free-solid-svg-icons";

import Routes from "./Routes";
import NavBar from "./NavBar";
import JoblyApi from "./api.js";
import './App.css';

/**
 * App()
 * state:
 *      currentUser 
 *      errors
 *      token
 *      isLoading
 *      
 * handles: 
 *      login
 *      signup
 *      logout 
 *      edit profile
 * 
 * sets token in localStorage, decodes token to get currentUser.
 */
function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [errors, setErrors] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLoading, setIsLoading] = useState(true);

  // when token changes, token is decoded to get user information.
  // current user is set
  useEffect(function getCurrentUserFromApi() {
    async function getCurrentUser() {
      if (token) {
        JoblyApi.token = token;
        const { username } = decode(token)
        const userFromApi = await JoblyApi.getUser({ username })
        setCurrentUser(userFromApi);
      }
      setIsLoading(false)
    }
    getCurrentUser();
  }, [token])

  // handle log in form submission, sets token into local storage
  async function logInUser(loginFormData) {
    console.log("app.js login ran");
    try {
      const token = await JoblyApi.login(loginFormData);
      // local storage
      localStorage.setItem("token", token)
      setToken(token)
      setErrors([]);
    } catch (err) {
      setErrors(err);
    }
  }

  // handle registration form submission, sets token into local storage
  async function registerUser(registerFormData) {
    try {
      const token = await JoblyApi.register(registerFormData);
      // local storage
      localStorage.setItem("token", token)
      setToken(token)
      setErrors([]);
    } catch (err) {
      setErrors(err);
    }
  }

  // handle edit user profile form. Only current user with correct password can 
  // edit profile
  async function editUser({ username, firstName, lastName, email, password }) {
    try {
      await JoblyApi.login({ username, password });
      await JoblyApi.editUser({ username, firstName, lastName, email, password });
      setErrors([]);
    } catch (err) {
      setErrors(err);
    }
  }

  // logout current user, set current user and token state to empty string
  function logout() {
    console.log("logout ran!");
    setCurrentUser(null);
    setToken(null);
    localStorage.removeItem("token");
  }

  // during initial render, wait for api calls to finish
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center">
        <FontAwesomeIcon className="spinnerIcon" icon={faCompass} size="10x"/>
      </div>)
  }

  return (
    <div className="App">
      { errors ? errors.map(err =>
        <Alert key={uuid()} variant="danger">{err}</Alert>)
        : null
      }
      <BrowserRouter>
        <NavBar
          logout={logout}
          currentUser={currentUser} />
        <Routes
          currentUser={currentUser}
          logInUser={logInUser}
          editUser={editUser}
          registerUser={registerUser} />
      </BrowserRouter>
    </div>
  );
}

export default App;

