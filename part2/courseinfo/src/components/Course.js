import React from "react";

const Header = ({ name }) => <h1>{name}</h1>;

const Part = ({ name, exerciseCount }) => (
  <p>
    {name} {exerciseCount}
  </p>
);

const Content = ({ parts }) =>
  parts.map((part) => (
    <Part key={part.id} name={part.name} exerciseCount={part.exercises} />
  ));

const Total = ({ parts }) => (
  <div>
    <b>
      total of {parts.reduce((part1, part2) => part1 + part2.exercises, 0)}{" "}
      exercises
    </b>
  </div>
);

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default Course;
