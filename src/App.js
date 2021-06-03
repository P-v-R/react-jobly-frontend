import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes";
import NavBar from "./NavBar";
import JoblyApi from "./api.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [token, setToken] = useState("");
  const [onLogin, setOnLogin] = useState(false);
  const [onRegister, setOnRegister] = useState(false);

    useEffect(function callLoginFromApi() {
      async function login() {
        try {
          const token = await JoblyApi.login({username, password});
          setToken(token);
          setCurrentUser({"username": username});
        } catch (err) {
          setErrors(err);
        }
      }
      if (onLogin) login();
    }, [onLogin])


  function logout() {
    setCurrentUser({});
    setToken("");
    setOnLogin(false);
  }

  seEffect(function callSignupFromApi() {
    async function signup() {
      try {
        const token = await JoblyApi.register({username, password, firstName, lastName, email});
        setToken(token);
        setCurrentUser({"username": username});
      } catch (err) {
        setErrors(err);
      }
    }
    if (onRegister) login();
  }, [onRegister])

  function loginFromForm() {
    setOnLogin(true);
  }

  function registerFromForm() {
    setOnRegister(true);
  }



  return (
    <div className="App">
      <BrowserRouter>
        <NavBar token={token} 
                currentUser={currentUser} 
                loginFromForm={loginFromForm} 
                registerFromFrom={registerFromForm}
                logout={logout}/> 
        <Routes token={token} 
                currentUser={currentUser}/>
      </BrowserRouter>
    </div>
  );
}

export default App;

// /auth/token: for login, /auth/register for signup
