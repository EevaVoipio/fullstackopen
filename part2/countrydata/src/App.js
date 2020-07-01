import React, { useState, useEffect } from "react";

import Filter from "./components/Filter";
import Countries from "./components/Countries";
import countryService from "./services/countries";

const App = () => {
  useEffect(() => {
    countryService.getCountryData().then((response) => {
      setCountries(response);
    });
  }, []);

  const [searchCountry, setSearchCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState();
  const handleSelectCountry = (name) => {
    setSelectedCountry(countries.find((country) => country.name === name));
  };

  const handleSearchCountry = (event) => {
    setSearchCountry(event.target.value);
    setSelectedCountry();
  };

  return (
    <div>
      <Filter
        searchField={searchCountry}
        handleSearchField={handleSearchCountry}
      />
      <Countries
        countries={countries}
        searchCountry={searchCountry}
        selectedCountry={selectedCountry}
        handleSelectCountry={handleSelectCountry}
      />
    </div>
  );
};

export default App;
