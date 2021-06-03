import React, { useState, useEffect } from "react";
import { BrowserRouter, Redirect } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {v4 as uuid} from "uuid"
import Routes from "./Routes";
import NavBar from "./NavBar";
import JoblyApi from "./api.js";
import Alert from "react-bootstrap/Alert";
import './App.css';

function App() {
  const [currentUser, setCurrentUser] = useState({username: ""});
  const [token, setToken] = useState("");
  const [onLogin, setOnLogin] = useState(false);
  const [onRegister, setOnRegister] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loginFormData, setLoginFormData] = useState({username: "", 
                                                      password: ""})
  const [registerFormData, setRegisterFormData] = useState({username: "", 
                                                            password: "", 
                                                            firstName: "", 
                                                            lastName: "", 
                                                            email: ""})
                              

    useEffect(function callLoginFromApi() {
      async function login() {
        console.log("app.js login ran")
        try {
          const token = await JoblyApi.login(loginFormData);
          setToken(token);
          setCurrentUser({"username": registerFormData.username || loginFormData.username});
          setOnLogin(false);
        } catch (err) {
          setErrors(err);
          setOnLogin(false);
        }
      }
      if (onLogin) login();
    }, [onLogin])


  function logout() {
    console.log("logout ran!")
    setCurrentUser({"username": ""});
    setToken("");
    setOnLogin(false);
  }

  useEffect(function callSignupFromApi() {
    async function signup() {
      console.log("registerFormData from signup api call-->", registerFormData)
      try {
        const token = await JoblyApi.register(registerFormData);
        setToken(token);
        setCurrentUser({"username": registerFormData.username || loginFormData.username});
        setOnRegister(false);
      } catch (err) {
        <Redirect to="/signup" />
        setErrors(err);
        setOnRegister(false);
      }
    }
    if (onRegister) signup();
  }, [onRegister])

  function loginFromForm({username, password}) {
    setOnLogin(true);
    setLoginFormData({username, password});

  }

  function registerFromForm({username, password, firstName, lastName, email}) {
    setOnRegister(true);
    setRegisterFormData({username, password, firstName, lastName, email})
  }

  return (
    <div className="App">
      { errors ? errors.map(err => <Alert key={uuid()} variant="danger">{err}</Alert>) : null }
      <BrowserRouter>
        <NavBar token={token} 
                currentUser={currentUser} /> 
        <Routes token={token} 
                currentUser={currentUser}
                loginFromForm={loginFromForm} 
                registerFromForm={registerFromForm}
                logout={logout}/>
      </BrowserRouter>
    </div>
  );
}

export default App;

