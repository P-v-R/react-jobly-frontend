import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Redirect } from 'react-router-dom'

/** Sign up form for jobly
 * 
 * prop: registerFromForm() , currentUser 
 * 
 * state: signUpFormData
 * 
 * 
 * App --> Routes --> SignUpForm
 */
function ProfileForm({ editUser, currentUser }) {
  const [profileFormData, setProfileFormData] = useState({
    "username": currentUser.username,
    "firstName": currentUser.firstName,
    "lastName": currentUser.lastName,
    "email": currentUser.email,
    "password": ""
  });

  // handle/control user inputs
  function handleChange(evt) {
    const { name, value } = evt.target;
    setProfileFormData(fData => ({
      ...fData,
      [name]: value,
    }));
  }

  // handle user submit and send data to parent component
  function handleSubmit(evt) {
    evt.preventDefault();
    editUser(profileFormData);
    setProfileFormData(oldFormData => ({
      ...oldFormData, password: ""
    }));
  }

  // redirect if there is no current user
  if (currentUser === null) {
    return <Redirect to="/" />
  }

  return (
    <Container fluid="sm">
      <h3>Username</h3>
      <p>{currentUser.username}</p>
      <Form className="LoginForm" onSubmit={handleSubmit}>

        <div className="form-floating mb-3">
          <Form.Control
            type="firstName"
            placeholder="firstName"
            name="firstName"
            value={profileFormData["firstName"]}
            onChange={handleChange} />
          <Form.Label>First name</Form.Label>
        </div>

        <div className="form-floating mb-3">
          <Form.Control
            type="lastName"
            name="lastName"
            value={profileFormData["lastName"]}
            onChange={handleChange} />
          <Form.Label>Last name</Form.Label>
        </div>

        <div className="form-floating mb-3">
          <Form.Control
            type="email"
            name="email"
            value={profileFormData["email"]}
            onChange={handleChange} />
          <Form.Label>Email</Form.Label>
        </div>

        <div className="form-floating mb-3">
          <Form.Control
            type="password"
            name="password"
            value={profileFormData["password"]}
            onChange={handleChange} />
          <Form.Label>Confirm password to make changes:</Form.Label>
        </div>

        <Button
          variant="primary"
          onClick={handleSubmit}>
          Save Changes
        </Button>
      </Form>
    </Container>
  );
}

export default ProfileForm;