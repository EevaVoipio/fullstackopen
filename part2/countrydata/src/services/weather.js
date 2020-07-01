import axios from "axios";

const api_key = process.env.REACT_APP_API_KEY;

const getWeatherData = (selectedCity) => {
  return axios
    .get(
      `http://api.weatherstack.com/current?access_key=${api_key}&query=${selectedCity}`
    )
    .then((response) => response.data.current);
};

export default { getWeatherData };
