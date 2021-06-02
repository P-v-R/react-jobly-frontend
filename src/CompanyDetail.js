import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "./api";
import JobCard from "./JobCard";
import Container from "react-bootstrap/Container"

/** Renders a companies details with job listing
 * 
 * state:
 *    company -> company object from api with handle of params name
 * 
 * Params: 
 *    handle as { name }
 */
function CompanyDetail() {
  const { name } = useParams();
  const [company, setCompany] = useState({});
  const [jobs, setJobs] = useState([]);

  // get information on individual company from api
  useEffect(function getCompanyFromApi() {
    async function getCompany() {
      let companyDetail = await JoblyApi.getCompany(name);
      setCompany(companyDetail);
    }
    getCompany();
  }, [name]);

  // get companies by company handle
  useEffect(function getCompanyJobsFromApi() {
    async function getCompanyJobs() {
      let companyJobs = await JoblyApi.getJobsByCompany(company.handle);
      setJobs(companyJobs);
    }
    getCompanyJobs();
  }, [company]);

  const companyJobCards = jobs.map(j =>
    <JobCard
      key={j.id}
      title={j.title}
      salary={j.salary}
      equity={j.equity}
      compHandle={j.companyHandle}
    />)

  return (
    <div>
      <Container>
        <h2>{company.name}</h2>
        <p>{company.description}</p>
      </Container>
      { companyJobCards}
    </div>
  )
}

export default CompanyDetail;