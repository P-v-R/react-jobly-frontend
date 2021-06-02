import React, { useEffect, useState } from "react";
import JoblyApi from "./api.js";
import CompanyCard from "./CompanyCard";
import SearchForm from "./SearchForm";
const TEMP_IMG_URL = "https://365psd.com/images/istock/previews/1687/16875125-greedy-man-holding-money.jpg"

/**
 * CompanyList
 * State: companies - all company objects in one array
 *        searchTerm - the user input being searched for 
 *                      when <SearchForm /> is submitted
 * 
 * Route --> CompanyList --> SearchForm --> CompanyCard
 * 
 * renders :
 *      SearchForm -> searchCompany()
 *      CompanyCard -> one for each company in state
 */

function CompanyList() {
  const [companies, setCompanies] = useState([])
  const [searchTerm, setSearchTerm] = useState("");

  // gets array of all companies from API
  useEffect(function getCompaniesFromApi() {
    async function getCompanies() {
      let companiesResp = await JoblyApi.getAllCompanies();
      setCompanies(companiesResp);
    }
    getCompanies();
  }, [])
  
  // when the searchTerm state changes, get all companies that match search criteria
  // and change Companies Array to searched companies  
  useEffect(function filterCompaniesBySearch() {
    async function searchCompanies() {
      let companies = await JoblyApi.searchCompaniesByName(searchTerm);
      setCompanies(companies);
    }
    if (searchTerm !== "") searchCompanies();
  }, [searchTerm]);

  // function to pass down to <SearchForm /> to retrieve search form value
  // and set searchTerm state with said value
  function searchCompany(searchedTerm) {
    setSearchTerm(searchedTerm);
  }

  // map over all companies in companies state and create
  // individual CompanyCards for each one 
  let companyCards = companies.map(c =>
    <CompanyCard
      key={c.handle}
      name={c.name}
      description={c.description}
      logoUrl={TEMP_IMG_URL}
      handle={c.handle}
    />);
  
  return (
    <div>
      <SearchForm search={searchCompany}/>
      {companyCards}
    </div>
  )
}

export default CompanyList;