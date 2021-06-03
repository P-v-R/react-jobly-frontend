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
  const [isRegister, setIsRegister] = useState(false);
  const [errors, setErrors] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token"))
  const [isLoading, setIsLoading] = useState(true)

  const [registerFormData, setRegisterFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: ""
  });


  // handle login form State received from loginFromForm() and make API call
  // catch any errors that API gives back, if successful clear errors, set isLogin to false
  // and assign currentUser

  // TODO add state for token
  // TODO implement login/register logic 

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

  // handle registration form State received from registerFromForm() and make API call
  // catch any errors that API gives back if successful clear errors, set isLogin to false
  // and assign currentUser
  useEffect(function callSignupFromApi() {
    async function signup() {
      try {
        const token = await JoblyApi.register(registerFormData);
        const username = registerFormData.username
        const userFromApi = await JoblyApi.getUser({ username, token })
        setCurrentUser(userFromApi)
        setIsRegister(false);
        setErrors([]);
      } catch (err) {
        setErrors(err);
        setIsRegister(false);
      }
    }
    if (isRegister) signup();
  }, [isRegister, registerFormData]);

  // TODO need an effect that 

  // set state from register form to trigger useEffect 
  function registerFromForm({ username, password, firstName, lastName, email }) {
    setIsRegister(true);
    setRegisterFormData({ username, password, firstName, lastName, email })
    setErrors([]);
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
          registerFromForm={registerFromForm} />
      </BrowserRouter>
    </div>
  );
}

export default App;

