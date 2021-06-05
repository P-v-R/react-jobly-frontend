import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Redirect } from 'react-router-dom';

/** Login form for jobly
 * 
 * props : loginFromForm(), currentUser
 * 
 * state : loginFormData 
 * 
 * App --> Routes --> LoginForm
 */

function LoginForm({ logInUser, currentUser }) {
  const [loginFormData, setLoginFormData] = useState({ "username": "", "password": "" })


  // handle/control user inputs
  function handleChange(evt) {
    const { name, value } = evt.target;
    setLoginFormData(fData => ({
      ...fData,
      [name]: value,
    }));
  }
  // handle user submit and send data to parent component
  async function handleSubmit(evt) {
    evt.preventDefault();
    await logInUser(loginFormData);
  }
  // redirect when theres a user logged in
  if (currentUser !== null) {
  return <Redirect to="/" />
  }

  // Can change naming of password field for new password vs curr password
  // for browser save
  return (
    <Container fluid="sm">
      <Form className="LoginForm" onSubmit={handleSubmit}>
        <div className="form-floating mb-3">
          <Form.Control
            type="username"
            placeholder="username"
            name="username"
            value={loginFormData.username}
            onChange={handleChange} />
          <Form.Label>Username</Form.Label>
        </div>
        <div className="form-floating mb-3">
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={loginFormData.password}
            onChange={handleChange} />
          <Form.Label>Password</Form.Label>
        </div>
        <Button
          variant="primary"
          type="submit"
          onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default LoginForm;