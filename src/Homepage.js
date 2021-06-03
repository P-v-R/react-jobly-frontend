import React from "react";
import Container from "react-bootstrap/Container";

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
          </Container>
        </div>
      }
    </div>
  )
}

export default HomePage;