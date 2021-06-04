import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearchDollar } from '@fortawesome/free-solid-svg-icons'

import "./SearchForm.css"

/** Generic Search Bar 
 * 
 * prop: search () from parent
 *        ---> either searchCompany or searchJob
 * 
 * state:
 *    term --> what is being searched for
 * 
 * TODO: add live search to update search results without submitting
*/
function SearchForm({ search, defaultValue = "" }) {
  const [term, setTerm] = useState(defaultValue);

  // handle/control user inputs
  function handleChange(evt) {
    setTerm(evt.target.value);
  }

  // handle user submit and send data to parent component
  function handleSubmit(evt) {
    evt.preventDefault();
    search(term.trim() || undefined);
    setTerm(defaultValue);
  }

  return (
    <form className="SearchForm" onSubmit={handleSubmit}>
      <div className="input-group rounded">
        <input
          value={term}
          onChange={handleChange}
          type="search" className="form-control rounded"
          placeholder="Enter search term..." />
        <button className="btn">
        <FontAwesomeIcon className="searchBtn" icon={faSearchDollar} size="2x"/>
        </button>
      </div>
    </form>
  );
}


export default SearchForm;