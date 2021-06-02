import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button"
import { Link } from "react-router-dom";
import "./JobCard.css"

function JobCard({ compHandle, title, salary, equity }) {
  let formattedSalary = (salary) ? salary.toLocaleString() : 0
  
  return (
    <div className="JobCardWrapper ">
      <Card className="JobCard">
        <Card.Header>{title}</Card.Header>
        <Card.Body>
          <Card.Title>Salary: ${formattedSalary} </Card.Title>
          <Card.Text>
            Company - {compHandle}
          </Card.Text>
          <Button variant="primary">Apply</Button>
        </Card.Body>
      </Card>
    </div>
  )
}

export default JobCard;