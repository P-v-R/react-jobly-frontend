import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';



function LoginForm() {
  const [loginFormData, setLoginFormData] = useState([])
  console.log("loginFormData ==>", loginFormData)

  // handle/control user inputs
  function handleChange(evt) {
    const { name, value } = evt.target;
    setLoginFormData(fData => ({
      ...fData,
      [name]: value,
    }));
  }
  // handle user submit and send data to parent component
  function handleSubmit(evt) {
    evt.preventDefault();

  }


  return (
    <Container>
      <form className="LoginForm" onSubmit={handleSubmit}>

        <div class="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingInput"
            placeholder="username"
            name="username"
            value={loginFormData["username"]}
            onChange={handleChange}
            type="search"  />
          <label className="label"> Username:</label>
        </div>

        <div class="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder=""
            name="password"
            value={loginFormData["password"]}
            onChange={handleChange}
            type="search" />
          <label for="floatingPassword"> Password:</label>
        </div>

        <button className="btn">
          click me!
        </button>

      </form>
    </Container>
  );
}

export default LoginForm;