import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';



function SignUpForm() {
  const [signUpFormData, setSignUpFormData] = useState({ "username": "", "password": "" })


  // handle/control user inputs
  function handleChange(evt) {
    const { name, value } = evt.target;
    setSignUpFormData(fData => ({
      ...fData,
      [name]: value,
    }));
  }
  // handle user submit and send data to parent component
  function handleSubmit(evt) {
    evt.preventDefault();
    console.log("This is what will be submitted =>", signUpFormData)
  }


  return (
    <Container fluid="sm">
      <Form className="LoginForm" onSubmit={handleSubmit}>
        <div className="form-floating mb-3">
          <Form.Control
            type="username"
            placeholder="username"
            name="username"
            value={signUpFormData["username"]}
            onChange={handleChange} />
          <Form.Label>Username</Form.Label>
        </div>

        <div className="form-floating mb-3">
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={signUpFormData["password"]}
            onChange={handleChange} />
          <Form.Label>Password</Form.Label>
        </div>

        <div className="form-floating mb-3">
          <Form.Control
            type="firstName"
            placeholder="firstName"
            name="firstName"
            value={signUpFormData["firstName"]}
            onChange={handleChange} />
          <Form.Label>First name</Form.Label>
        </div>

        <div className="form-floating mb-3">
          <Form.Control
            type="lastName"
            placeholder="lastName"
            name="lastName"
            value={signUpFormData["lastName"]}
            onChange={handleChange} />
          <Form.Label>Last name</Form.Label>
        </div>

        <div className="form-floating mb-3">
          <Form.Control
            type="email"
            placeholder="email"
            name="email"
            value={signUpFormData["email"]}
            onChange={handleChange} />
          <Form.Label>Email</Form.Label>
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

export default SignUpForm;