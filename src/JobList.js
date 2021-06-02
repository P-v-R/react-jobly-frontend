import React, { useState, useEffect } from "react";
import JoblyApi from "./api.js";
import JobCardList from "./JobCardList";
import SearchForm from "./SearchForm";
import Alert from "react-bootstrap/Alert";

/**
 * JobList 
 * state:
 *    Jobs - all job listings in one array
 *    searchTerm - the user input searched for 
 *                 when <SearchForm /> is submitted
 *    errors - array of all errors if they occur
 * 
 * route --> JobList --> SearchForm --> CompanyCard
 * 
 * renders:
 *    SearchForm -> SearchJob()
 *    JobCard -> one for each job in state
 */

function JobList() {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [errors, setErrors] = useState("");

  // gets array of all jobs from API
  useEffect(function getJobsFromApi() {
    async function getJobs() {
      try {
        let jobsResp = await JoblyApi.getAllJobs();
        setJobs(jobsResp);
      } catch (err) {
        setErrors(err);
      }
    }
    getJobs();
  }, [])

  // when the searchTerm state changes, get all Jobs that match search criteria
  // and change Jobs Array to searched Jobs  
  useEffect(function filterJobsBySearch() {
    async function searchJobs() {
      try {
        let jobsResp = await JoblyApi.getAllJobs(searchTerm);
        setJobs(jobsResp);
      } catch (err) {
        setErrors(err);
      }
    }
    if (searchTerm !== "") searchJobs();
  }, [searchTerm]);

  // function to pass down to <SearchForm /> to retrieve search form value
  // and set searchTerm state with said value
  function searchJobs(searchedTerm) {
    setSearchTerm(searchedTerm);
  }

  return (
    <div>
      { errors ? errors.map(err => <Alert variant="danger">{err}</Alert>) : null }
      <SearchForm search={searchJobs} />
      <JobCardList jobs={jobs} />
    </div>);

}

export default JobList;