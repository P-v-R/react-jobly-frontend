import React from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { NavLink } from "react-router-dom";

import "./Homepage.css";

// TODO: add doc string
function HomePage({ currentUser }) {
// TODO: change ternary into two if statements
// TODO: change buttons (in nav bar, and here) to links for single page app
  return (
    <div>
      { (currentUser) ?
        <div className="homepage loggedIn">
          <Container className=" mt-2 d-flex justify-content-center">
            <h1>Welcome Back {currentUser.username}!</h1>
          </Container>
          <Container className="d-flex justify-content-center">
            <h3>May you start printing dollars.</h3>
          </Container>
          <Container className="d-flex justify-content-center">
            <Button
              className="homeButton"
              href="/companies"
              variant="outline-primary">
              Companies</Button>
            <NavLink className="btn btn-primary" exact to="/jobs">
              Jobs
            </NavLink>
            <Button
              className="homeButton"
              href="/jobs"
              variant="outline-primary">
              Jobs</Button>
          </Container>
        </div>
        :
        <div className="homepage loggedOut">
          <Container className="d-flex justify-content-center">
            <h1>Welcome to Jobly!</h1>
          </Container>
          <Container className="d-flex justify-content-center">
            <h3>Your one stop job destination</h3>
          </Container >
          <Container className="d-flex justify-content-center">
            <Button
              className="homeButton"
              href="/login"
              variant="outline-primary">
              login</Button>
            <Button
              className="homeButton"
              href="/signup"
              variant="outline-primary">
              sign up</Button>
          </Container>
        </div>
      }
    </div>
  );
}

export default HomePage;