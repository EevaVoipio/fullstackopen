import React, { useEffect, useState } from "react";

import Button from "./Button";
import weatherService from "../services/weather";

const Countries = ({
  countries,
  searchCountry,
  selectedCountry,
  handleSelectCountry,
}) => {
  if (selectedCountry) {
    return <Country country={selectedCountry} />;
  } else {
    const filteredCountries = countries.filter((country) =>
      country.name.toLowerCase().includes(searchCountry.toLowerCase())
    );
    if (filteredCountries.length === 1) {
      return <Country country={filteredCountries[0]} />;
    } else if (filteredCountries.length < 11) {
      return filteredCountries.map((country) => (
        <div key={country.name}>
          <CountryName name={country.name} />
          <Button
            key={country.name}
            handleClick={handleSelectCountry.bind(this, country.name)}
            text="Show"
          />
        </div>
      ));
    } else {
      return <div>Too many matches, specify another filter</div>;
    }
  }
};

const CountryName = ({ name }) => {
  return <div>{name}</div>;
};

const Country = ({ country }) => {
  const selectedCity = country.capital;
  const [weather, setWeather] = useState("");
  useEffect(() => {
    weatherService.getWeatherData(selectedCity).then((response) => {
      setWeather(response);
    });
  }, [selectedCity]);
  return (
    <div>
      <h1>{country.name}</h1>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <h1>languages</h1>
      <ul>
        {country.languages.map((language) => (
          <li key={language.name}>{language.name}</li>
        ))}
      </ul>
      <img src={country.flag} width="10%" height="10%" alt="Country flag" />
      <h1>Weather in {country.capital}</h1>
      <div>
        <b>temperature:</b> {weather.temperature} Celcius
      </div>
      <img src={weather.weather_icons} alt="Weather icon" />
      <div>
        <b>wind:</b> {weather.wind_speed} mph direction {weather.wind_dir}
      </div>
    </div>
  );
};

export default Countries;
