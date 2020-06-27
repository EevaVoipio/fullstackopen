import React from "react";
import ReactDOM from "react-dom";

const Header = ({ name }) => {
  return <h1>{name}</h1>;
};

const Part = ({ name, exerciseCount }) => {
  return (
    <p>
      {name} {exerciseCount}
    </p>
  );
};

const Content = ({ parts }) =>
  parts.map((part) => (
    <Part key={part.name} name={part.name} exerciseCount={part.exercises} />
  ));

const Total = ({ parts }) =>
  parts.reduce((part1, part2) => part1 + part2.exercises, 0);

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
