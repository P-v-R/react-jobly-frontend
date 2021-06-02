import React, { useState, useEffect } from "react";
import JoblyApi from "./api.js";
import JobCardList from "./JobCardList";
import SearchForm from "./SearchForm";
import Alert from "react-bootstrap/Alert";
import {v4 as uuid} from "uuid"

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
  const [searchTerm, setSearchTerm] = useState();
  const [errors, setErrors] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // gets array of all jobs from API
  useEffect(function getJobsFromApi() {
    console.log("search term from FX ==>", searchTerm);

    async function getJobs() {
      try {
        const jobsResp = await JoblyApi.getAllJobs(searchTerm);
        console.log("jobs resp ==>", jobsResp)
        setJobs(jobsResp);
        setIsLoading(false);
      } catch (err) {
        setErrors(err);
      }
    }
    getJobs();
  }, [searchTerm, isLoading])

 
 
  function searchJobs(searchedTerm) {
    setSearchTerm(searchedTerm);
    setIsLoading(true);
  }

  if (isLoading) return <div></div>;

  return (
    <div>
      { errors ? errors.map(err => <Alert key={uuid()} variant="danger">{err}</Alert>) : null}
      <SearchForm
        search={searchJobs}
        defaultValue={searchTerm}
      />
      {jobs.length === 0 ?
        <h3>No jobs found </h3> :
        <JobCardList jobs={jobs} />
      }
    </div>
  );
}

export default JobList;