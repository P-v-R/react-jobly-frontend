import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./JobCard.css";

/** Renders a JobCard with job information
 * 
 * props: { compHandle, title, salary, equity }
 * 
 * JobCardList --> JobCard
 */
function JobCard({ compHandle, title, salary, equity }) {
  let formattedSalary = (salary) ? salary.toLocaleString() : 0

  let formattedEquity = (equity) ? equity : 0;
  
  return (
    <div className="JobCardWrapper ">
      <Card className="JobCard">
        <Card.Header>{title}</Card.Header>
        <Card.Body>
          <Card.Title>Salary: ${formattedSalary} </Card.Title>
          <Card.Text>
            {compHandle && `Company - ${compHandle}`}
            <br/>
            Offering {formattedEquity}% in equity.
          </Card.Text>
          <Button variant="primary">Apply</Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default JobCard;