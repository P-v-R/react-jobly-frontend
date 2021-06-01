import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/button"
/**
 * CompanyCard
 *  Prop: company: {handle,name, description, numEmployees, logoUrl}
 *            
 *  basic component to visualize details of a single company
 */
function CompanyCard({ name, description, logoUrl }) {

  return (

    <Card style={{ width: '14rem' }}>
      <Card.Img variant="top" src={logoUrl} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          {description}
    </Card.Text>
    <Button variant="primary">View {name}</Button>
    </Card.Body>
    </Card>)
}

export default CompanyCard;