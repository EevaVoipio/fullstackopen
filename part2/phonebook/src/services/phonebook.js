import axios from "axios";

const baseUrl = "api/persons";

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

const changePhoneNumber = (id, personObject) => {
  return axios
    .put(`${baseUrl}/${id}`, personObject)
    .then((response) => response.data);
};

export default { getPhoneBook, addPerson, deletePerson, changePhoneNumber };
