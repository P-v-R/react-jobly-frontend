import React, { useEffect, useState } from "react";
import JoblyApi from "./api.js";
import CompanyCard from "./CompanyCard";
import SearchForm from "./SearchForm";
const TEMP_IMG_URL = "https://365psd.com/images/istock/previews/1687/16875125-greedy-man-holding-money.jpg"

/**
 * CompanyList
 * State: companies - all company objects in one big array
 * 
 * Route --> CompanyList --> CompanyCard
 */
function CompanyList() {
  const [companies, setCompanies] = useState([])
  const [searched, setSearched] = useState(false)
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(function getCompaniesFromApi() {
    async function getCompanies() {
      let companies = await JoblyApi.getAllCompanies()
      console.log("Companies ==>", companies)
      setCompanies(companies);
    }
    getCompanies()
    //console.log("FIRST LOGO URL ==>", companies[0].logoUrl)
  }, [])

  useEffect(function filterCompaniesBySearch() {
    async function searchCompanies() {
      let companies = await JoblyApi.searchCompanies(searchTerm);
      setCompanies(companies);
      setSearched(false);
    }
    if (searched) searchCompanies();
  }, [searched])

  function search(searchedTerm) {
    setSearchTerm(searchedTerm);
    setSearched(true);
  }

  // write map over companies and make a CompanyCard component for each one
  let companyCards = companies.map(c =>
    <CompanyCard
      key={c.handle}
      name={c.name}
      description={c.description}
      logoUrl={TEMP_IMG_URL}
      handle={c.handle}
    />)

  return (
    <div>
      <SearchForm source="company"
                  search={search}/>
      {companyCards}
    </div>
  )
}

export default CompanyList;