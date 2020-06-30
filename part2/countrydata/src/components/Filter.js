import React from "react";

const Filter = ({ searchField, handleSearchField }) => {
  return (
    <div>
      find countries: <input value={searchField} onChange={handleSearchField} />
    </div>
  );
};

export default Filter;
