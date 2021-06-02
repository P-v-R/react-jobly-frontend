import React from "react";
import Container from "react-bootstrap/Container";

function HomePage(){
  return (
    <div>
      <Container className="d-flex justify-content-center">
        <h1>Welcome to Jobly!</h1>
      </Container>
      <Container className="d-flex justify-content-center">
        <h3>Your one stop job destination</h3>
      </Container>
    </div>
  );
}

export default HomePage;