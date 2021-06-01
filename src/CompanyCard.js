import React from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
/**
 * CompanyCard
 *  Prop: company: {handle,name, description, numEmployees, logoUrl}
 *            
 *  basic component to visualize details of a single company
 */
function CompanyCard({ name, description, logoUrl, handle }) {

  return (

    <Card style={{ width: '14rem' }}>
      <Card.Img variant="top" src={logoUrl} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          {description}
    </Card.Text>
    <Link className="btn btn-primary" to={`companies/${handle}`}>View {name}</Link>
    </Card.Body>
    </Card>)
}

export default CompanyCard;