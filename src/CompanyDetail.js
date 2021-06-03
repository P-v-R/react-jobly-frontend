import React, { useEffect, useState, useContext } from "react";
import { useParams, Redirect } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import {v4 as uuid } from "uuid";

import JoblyApi from "./api";
import JobCardList from "./JobCardList";
import UserContext from "./userContext";

/** Renders a companies details with job listing
 * 
 * state:
 *    company -> company object from api with handle of params name
 *    jobs -> array of job objects from company
 *    errors -> array of all errors if they occur
 * 
 * Params: 
 *    handle as { name }
 */
function CompanyDetail() {
  const { name } = useParams();
  const [company, setCompany] = useState({});
  const [jobs, setJobs] = useState([]);
  const [errors, setErrors] = useState([]);
  const { currentUser } = useContext(UserContext);
  
  console.log("currentUser in companydetail from context--->", currentUser);
  
  console.log("companyDetail--->", company.jobs);
  // get information on individual company from api
  useEffect(function getCompanyFromApi() {
    async function getCompany() {
      try {
        const companyDetail = await JoblyApi.getCompany(name);
        setCompany(companyDetail);
        setJobs(companyDetail.jobs);
      } catch (err) {
        setErrors(err);
      }
    }
    if (currentUser) getCompany();
  }, [name, currentUser]);
  
  if (currentUser === null) {
    return (<Redirect to="/" />)
  }

  return (
    <div>
      { errors ? errors.map(err => <Alert key={uuid()} variant="danger">{err}</Alert>) : null }
      <Container>
        <h2>{company.name}</h2>
        <p>{company.description}</p>
      </Container>
      { <JobCardList jobs={jobs}/> }
    </div>
  );
}

export default CompanyDetail;