import axios from "axios";

const getCountryData = () => {
  return axios
    .get("https://restcountries.eu/rest/v2/all")
    .then((response) => response.data);
};

export default { getCountryData };
