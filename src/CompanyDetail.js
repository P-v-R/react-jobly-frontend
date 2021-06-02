import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "./api";

/** Renders a companies details with job listing
 * 
 * state:
 *    company -> company object from api with handle of params name
 * 
 * Params: 
 *    handle as { name }
 */
function CompanyDetail(){
  const { name } = useParams();
  const [company, setCompany] = useState({});

  // get information on individual company from api
  useEffect(function getCompanyFromApi() {
    async function getCompany() {
      let companyDetail = await JoblyApi.getCompany(name);
      setCompany(companyDetail);
    }
    getCompany();
  }, []);

  return (
    <div>
      <h2>{company.name}</h2>
      <p>{company.description}</p>
    </div>
  )
}

export default CompanyDetail;