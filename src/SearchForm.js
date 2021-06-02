import React, { useState } from "react";
import "./SearchForm.css"

/** Generic Search Bar 
 * 
 * prop: search () from parent
 *        ---> either searchCompany or searchJob
 * 
 * state:
 *    term --> what is being searched for
*/
function SearchForm({ search }) {
  const [term, setTerm] = useState("");

  // handle/control user inputs
  function handleChange(evt) {
    setTerm(evt.target.value);
  }

  // handle user submit and send data to parent component
  function handleSubmit(evt) {
    evt.preventDefault();
    search(term);
    setTerm("");
  }

  return (
    <form className="SearchForm" onSubmit={handleSubmit}>
      <div class="input-group rounded">
        <input
          value={term}
          onChange={handleChange}
          type="search" class="form-control rounded"
          placeholder="Search" />
        <button className="btn search">Search!</button>
      </div>
    </form>
  );
}


export default SearchForm;