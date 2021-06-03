import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { v4 as uuid } from "uuid"
import Routes from "./Routes";
import NavBar from "./NavBar";
import JoblyApi from "./api.js";
import Alert from "react-bootstrap/Alert";
import { decode } from "jsonwebtoken";
import './App.css';

/**
 * Need a docstring overhaul on this 
 * App()
 * state:
 *      currentUser 
 *      isLogin
 *      isRegister
 *      errors
 *      loginFormData
 *      registerFormData
 *      
 * handles login signup functionality 
 */
function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [errors, setErrors] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLoading, setIsLoading] = useState(true);

  // handle login form State received from loginFromForm() and make API call
  // catch any errors that API gives back, if successful clear errors, set isLogin to false
  // and assign currentUser

  useEffect(function getCurrentUserFromApi(){
    async function getCurrentUser(){
      if(token){
        JoblyApi.token = token;
        const { username } = decode(token)
        const userFromApi = await JoblyApi.getUser({ username })
        setCurrentUser(userFromApi);
      }
      setIsLoading(false)
    }
    getCurrentUser();
  }, [token])

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

  async function editUser({ username, firstName, lastName, email, password}) {
    try {
      await JoblyApi.login({username, password});
      await JoblyApi.editUser({username, firstName, lastName, email, password});
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

  if(isLoading){
    return (<h1>Loading</h1>)
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

