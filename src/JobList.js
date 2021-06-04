import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompass } from "@fortawesome/free-solid-svg-icons";
import Alert from "react-bootstrap/Alert";
import {v4 as uuid} from "uuid";

import JoblyApi from "./api.js";
import JobCardList from "./JobCardList";
import SearchForm from "./SearchForm";
import UserContext from "./userContext";

/**
 * JobList 
 * state:
 *    Jobs - all job listings in one array
 *    searchTerm - the user input searched for 
 *                 when <SearchForm /> is submitted
 *    errors - array of all errors if they occur
 *    isLoading (boolean)
 *    
 * Context:
 *      currentUser {object of info on current user}
 * 
 * route --> JobList --> SearchForm --> CompanyCard
 * 
 * renders:
 *    SearchForm -> SearchJob()
 *    JobCard -> one for each job in state
 * 
 * TODO: add pagination to show 20 jobs at a time
 */

function JobList() {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState();
  const [errors, setErrors] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  
  const { currentUser } = useContext(UserContext);

  // gets array of all jobs from API
  useEffect(function getJobsFromApi() {

    async function getJobs() {
      try {
        const jobsResp = await JoblyApi.getAllJobs(searchTerm);
        setJobs(jobsResp);
        setIsLoading(false);
      } catch (err) {
        setErrors(err);
        setIsLoading(false);
      }
    }
    if (currentUser) getJobs();
  }, [searchTerm, isLoading, currentUser])

  // handle search form
  function searchJobs(searchedTerm) {
    setSearchTerm(searchedTerm);
    setIsLoading(true);
  }
  
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