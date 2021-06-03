import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { v4 as uuid } from "uuid"
import Routes from "./Routes";
import NavBar from "./NavBar";
import JoblyApi from "./api.js";
import Alert from "react-bootstrap/Alert";
import './App.css';

/**
 * Need a docstring overhaul on this 
 * App()
 * state:
 *      currentUser 
 *      token
 *      isLogin
 *      isRegister
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
  const [isLogin, setIsLogin] = useState(false); // should think of better name 
  const [isRegister, setIsRegister] = useState(false); // should think of better name 
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
        setIsLogin(false);
        setErrors([]);
      } catch (err) {
        setErrors(err);
        setIsLogin(false);
      }
    }
    if (isLogin) login();
  }, [isLogin, loginFormData]);

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
        setIsRegister(false);
        setErrors([]);
      } catch (err) {
        setErrors(err);
        setIsRegister(false);
      }
    }
    if (isRegister) signup();
  }, [isRegister, registerFormData]);

  // set state from log inform to trigger useEffect 
  function loginFromForm({ username, password }) {
    setIsLogin(true);
    setLoginFormData({ username, password });
  }


  // set state from register form to trigger useEffect 
  function registerFromForm({ username, password, firstName, lastName, email }) {
    setIsRegister(true);
    setRegisterFormData({ username, password, firstName, lastName, email })
    setErrors([]);
  }

  // logout current user, set current user and token state to empty string
  function logout() {
    console.log("logout ran!")
    setCurrentUser(null);
    setToken("");
    setIsLogin(false);
  }
  return (
    <div className="App">
      { errors ? errors.map(err => <Alert key={uuid()} variant="danger">{err}</Alert>) : null}
      <BrowserRouter>
        <NavBar
          logout={logout}
          currentUser={currentUser} />
        <Routes 
          token={token}
          currentUser={currentUser}
          loginFromForm={loginFromForm}
          registerFromForm={registerFromForm} />
      </BrowserRouter>
    </div>
  );
}

export default App;

