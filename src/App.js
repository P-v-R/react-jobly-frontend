import React, { useState, useEffect } from "react";
import { BrowserRouter, Redirect } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { v4 as uuid } from "uuid"
import Routes from "./Routes";
import NavBar from "./NavBar";
import JoblyApi from "./api.js";
import Alert from "react-bootstrap/Alert";
import { useJwt } from "react-jwt";
import './App.css';

/**
 * Need a docstring overhaul on this 
 * App()
 * state:
 *      currentUser 
 *      token
 *      onLogin
 *      onRegister
 *      errors
 *      loginFormData
 *      registerFormData
 *      
 * 
 * handles login signup functionality 
 */
function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState("");
  const [onLogin, setOnLogin] = useState(false); // should think of better name 
  const [onRegister, setOnRegister] = useState(false); // should think of better name 
  const [errors, setErrors] = useState([]);
  const [loginFormData, setLoginFormData] = useState({
    username: "",
    password: ""
  });
  const [registerFormData, setRegisterFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: ""
  });


  // handle login form State received from loginFromForm() and make API call
  // catch any errors that API gives back
  useEffect(function callLoginFromApi() {
    async function login() {
      console.log("app.js login ran")
      try {
        const token = await JoblyApi.login(loginFormData);
        setToken(token);
        const username = loginFormData.username
        const userFromApi = await JoblyApi.getUser({ username, token })
        setCurrentUser(userFromApi)
        setOnLogin(false);
      } catch (err) {
        setErrors(err);
        setOnLogin(false);
      }
    }
    if (onLogin) login();
  }, [onLogin]);


  // let payload = useJwt(token);


  // handle registration form State received from registerFromForm() and make API call
  // catch any errors that API gives back
  useEffect(function callSignupFromApi() {
    async function signup() {
      try {
        const token = await JoblyApi.register(registerFormData);
        setToken(token);
        const username = registerFormData.username
        const userFromApi = await JoblyApi.getUser({ username, token })
        setCurrentUser(userFromApi)
        setOnRegister(false);
      } catch (err) {
        setErrors(err);
        setOnRegister(false);
      }
    }
    if (onRegister) signup();
  }, [onRegister]);
  // TODO double check state name 


  // set state from log inform to trigger useEffect 
  function loginFromForm({ username, password }) {
    setOnLogin(true);
    setLoginFormData({ username, password });
  }


  // set state from register form to trigger useEffect 
  function registerFromForm({ username, password, firstName, lastName, email }) {
    setOnRegister(true);
    setRegisterFormData({ username, password, firstName, lastName, email })
    setErrors([]);
  }

  // logout current user, set current user and token state to empty string
  function logout() {
    console.log("logout ran!")
    setCurrentUser(null);
    setToken("");
    setOnLogin(false);
  }
  return (
    <div className="App">
      { errors ? errors.map(err => <Alert key={uuid()} variant="danger">{err}</Alert>) : null}
      <BrowserRouter>
        <NavBar token={token}
          logout={logout}
          currentUser={currentUser} />
        <Routes token={token}
          currentUser={currentUser}
          loginFromForm={loginFromForm}
          registerFromForm={registerFromForm} />
      </BrowserRouter>
    </div>
  );
}

export default App;

