import React from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";


function HomePage({ currentUser }) {


  return (
    <div>
      { (currentUser) ?
        <div>
          <Container className="d-flex justify-content-center">
            <h1>Welcome Back {currentUser.username}!</h1>
          </Container>
          <Container className="d-flex justify-content-center">
            <h3>May you start printing dollars soon.</h3>
          </Container>
        </div>
        :
        <div>
          <Container className="d-flex justify-content-center">
            <h1>Welcome to Jobly!</h1>
          </Container>
          <Container className="d-flex justify-content-center">
            <h3>Your one stop job destination</h3>
          </Container >
          <Container className="d-flex justify-content-center">
            <Button
              className="m-4 p-3"
              href="/login"
              variant="outline-info">
              login</Button>
            <Button
              className="m-4 p-3"
              href="/signup"
              variant="outline-info">
              sign up</Button>
          </Container>
        </div>
      }
    </div>
  );
}

export default HomePage;