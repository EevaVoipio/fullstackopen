import React from "react";

const Persons = ({ persons, searchName }) =>
  persons
    .filter((person) =>
      person.name.toLowerCase().includes(searchName.toLowerCase())
    )
    .map((person) => <Person key={person.name} person={person} />);

const Person = ({ person }) => (
  <div>
    {person.name} {person.number}
  </div>
);

export default Persons;
