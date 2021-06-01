import React, { useEffect, useState } from "react";
import JoblyApi from "./api.js"
import CompanyCard from "./CompanyCard"
const TEMP_IMG_URL = "https://365psd.com/images/istock/previews/1687/16875125-greedy-man-holding-money.jpg"

/**
 * CompanyList
 * State: companies - all company objects in one big array
 * 
 * Route --> CompanyList --> CompanyCard
 */
function CompanyList() {
  const [companies, setCompanies] = useState([])



  useEffect(function getCompaniesFromApi() {
    async function getCompanies() {
      let companies = await JoblyApi.getAllCompanies()
      console.log("Companies ==>", companies)
      setCompanies(companies);
    }
    getCompanies()
    //console.log("FIRST LOGO URL ==>", companies[0].logoUrl)
  }, [])


  // write map over companies and make a CompanyCard component for each one
  let companyCards = companies.map(c =>
    <CompanyCard
      key={c.handle}
      name={c.name}
      description={c.description}
      logoUrl={TEMP_IMG_URL} 
    />)
  return (
    <div>
      {companyCards}
    </div>
  )
}

export default CompanyList;