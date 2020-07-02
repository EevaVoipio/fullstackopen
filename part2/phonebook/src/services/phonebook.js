import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const getPhoneBook = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const addPerson = (personObject) => {
  return axios.post(baseUrl, personObject).then((response) => response.data);
};

const deletePerson = (id) => {
  return axios
    .delete(`${baseUrl}/${id}`)
    .then((response) => console.log(response));
};

export default { getPhoneBook, addPerson, deletePerson };
