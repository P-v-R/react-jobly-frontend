import React, { useState, useEffect } from "react";
import JoblyApi from "./api.js";
import JobCard from "./JobCard"
import SearchForm from "./SearchForm";

/**
 * JobList 
 * state:
 *    Jobs - all job listings in one array
 *    searchTerm - the user input searched for 
 *                 when <SearchForm /> is submitted
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

  // gets array of all jobs from API
  useEffect(function getJobsFromApi() {
    async function getJobs() {
      let jobsResp = await JoblyApi.getAllJobs();
      console.log("jobs resp ====>", jobsResp)
      setJobs(jobsResp);
    }
    getJobs();
  }, [])

  // when the searchTerm state changes, get all Jobs that match search criteria
  // and change Jobs Array to searched Jobs  
  useEffect(function filterJobsBySearch() {
    async function searchJobs() {
      let jobsResp = await JoblyApi.searchJobsByTitle(searchTerm);
      setJobs(jobsResp);
    }
    if (searchTerm !== "") searchJobs();
  }, [searchTerm]);

  // function to pass down to <SearchForm /> to retrieve search form value
  // and set searchTerm state with said value
  function searchJobs(searchedTerm) {
    setSearchTerm(searchedTerm);
  }

  const jobCards = jobs.map(j =>
    <JobCard
      key={j.id}
      title={j.title}
      salary={j.salary}
      equity={j.equity}
      compHandle={j.companyHandle}
    />)


  return (<div>
    <SearchForm search={searchJobs} />
    {jobCards}
    </div>)

}

export default JobList;