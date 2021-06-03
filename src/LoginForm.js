import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Redirect} from 'react-router-dom';

/** Login form for jobly
 * 
 * App --> Routes --> LoginForm
 */

function LoginForm({loginFromForm, currentUser}) {
  const [loginFormData, setLoginFormData] = useState({"username":"", "password":""})


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
    console.log("This is what will be submitted =>", loginFormData)
    loginFromForm(loginFormData);
  }
  console.log("===> currUser", currentUser)

  if(currentUser !== null){
    <Redirect to="/companies" />
  }

  return (
    <Container fluid="sm">
      <Form className="LoginForm" onSubmit={handleSubmit}>
        <div className="form-floating mb-3">
          <Form.Control
            type="username"
            placeholder="username"
            name="username"
            value={loginFormData["username"]}
            onChange={handleChange} />
          <Form.Label>Username</Form.Label>
        </div>
        <div className="form-floating mb-3">
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={loginFormData["password"]}
            onChange={handleChange} />
          <Form.Label>Password</Form.Label>
        </div>
        <Button 
        variant="primary" 
        onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default LoginForm;