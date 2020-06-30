import React, { useEffect, useState } from "react";
import axios from "axios";

import Button from "./Button";

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
  const api_key = process.env.REACT_APP_API_KEY;
  const [weather, setWeather] = useState("");
  const weatherHook = () => {
    axios
      .get(
        "http://api.weatherstack.com/current?access_key=" +
          api_key +
          "&query=" +
          selectedCity
      )
      .then((response) => {
        setWeather(response.data.current);
        console.log(response.data.current);
      });
  };
  useEffect(weatherHook, []);
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
      <img src={country.flag} width="10%" height="10%" />
      <h1>Weather in {country.capital}</h1>
      <div>
        <b>temperature:</b> {weather.temperature} Celcius
      </div>
      <img src={weather.weather_icons} />
      <div>
        <b>wind:</b> {weather.wind_speed} mph direction {weather.wind_dir}
      </div>
    </div>
  );
};

export default Countries;
