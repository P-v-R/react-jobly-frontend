import React from "react";
import JobCard from "./JobCard";

/** Creates a list of all JobCards
 * 
 * props: { jobs }
 * 
 * JobList --> JobCardList --> JobCard
 * CompanyDetail --> JobCardList --> JobCard
 */
function JobCardList({jobs}){
  const jobCards = jobs.map(j =>
    <JobCard
      key={j.id}
      title={j.title}
      salary={j.salary}
      equity={j.equity}
      compHandle={j.companyHandle}
    />)
  return jobCards;
}

export default JobCardList;