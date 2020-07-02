import React from "react";

import Button from "./Button";

const Persons = ({ persons, searchName, handleDeletePerson }) => {
  return persons
    .filter((person) =>
      person.name.toLowerCase().includes(searchName.toLowerCase())
    )
    .map((person) => (
      <div key={person.id}>
        <Person person={person} />
        <Button
          handleClick={handleDeletePerson.bind(this, person.id, person.name)}
          text="delete"
        />
      </div>
    ));
};

const Person = ({ person }) => (
  <>
    {person.name} {person.number}
  </>
);

export default Persons;
