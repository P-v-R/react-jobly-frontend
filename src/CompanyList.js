import React, { useEffect, useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import JoblyApi from "./api.js";
import CompanyCard from "./CompanyCard";
import SearchForm from "./SearchForm";
import Alert from "react-bootstrap/Alert";
import { v4 as uuid } from "uuid";
import UserContext from "./userContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompass } from "@fortawesome/free-solid-svg-icons";
import "./CompanyList.css"
const TEMP_IMG_URL = "https://365psd.com/images/istock/previews/1687/16875125-greedy-man-holding-money.jpg";

/**
 * CompanyList
 * State: companies - all company objects in one array
 *        searchTerm - the user input being searched for 
 *                      when <SearchForm /> is submitted
 *        errors - array of all errors if they occur
 * 
 * Route --> CompanyList --> SearchForm --> CompanyCard
 * 
 * renders :
 *      SearchForm -> searchCompany()
 *      CompanyCard -> one for each company in state
 */

function CompanyList() {
  const [companies, setCompanies] = useState([])
  const [searchTerm, setSearchTerm] = useState();
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser } = useContext(UserContext);

  // console.log("companyList errors-->", errors);
  // console.log("companyList searchTerm-->", searchTerm);
  // console.log("companyList companies-->", companies);
  /**gets array of all companies from API
   * 
   * can accept param: name as searchTerm
   *  */
  useEffect(function getCompaniesFromApi() {
    async function getCompanies() {
      try {
        const companiesResp = await JoblyApi.getAllCompanies(searchTerm);
        setCompanies(companiesResp);
        setIsLoading(false);
      } catch (err) {
        setErrors(err);
        setIsLoading(false);
      }
    }
    if (currentUser) getCompanies();
  }, [searchTerm, isLoading, currentUser])



  // function to pass down to <SearchForm /> to retrieve search form value
  // and set searchTerm state with said value
  function searchCompany(searchedTerm) {
    setSearchTerm(searchedTerm);
    setIsLoading(true);
  }

  // map over all companies in companies state and create
  // individual CompanyCards for each one 
  let companyCards = companies.map(c =>
    <CompanyCard
      key={c.handle}
      name={c.name}
      description={c.description}
      logoUrl={c.logoUrl || TEMP_IMG_URL}
      handle={c.handle}
    />);

  // if user is not logged in, redirects to homepage
  if (currentUser === null) {
    return (<Redirect to="/" />)
  }

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center">
        <FontAwesomeIcon className="spinnerIcon" icon={faCompass} size="10x"/>
      </div>)
  }

  return (
    <div>
      { errors ? errors.map(err => <Alert key={uuid()} variant="danger">{err}</Alert>) : null}
      <SearchForm search={searchCompany} defaultValue={searchTerm} />
      {(companyCards.length === 0) ?
        <h3>No Companies Found</h3> :
        companyCards}
    </div>
  );
}

export default CompanyList;