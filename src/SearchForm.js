import React, { useState } from "react";

/** Generic Search Bar 
 * 
 * prop: "company" or "job"
*/
function SearchForm({source, search}){
  const [term, setTerm] = useState("");

  function handleChange(evt) {
    setTerm(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    search(term);
    setTerm("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={term} onChange={handleChange} />
      <button>Search!</button>
    </form>
  )
}

export default SearchForm;