import React from "react";
import ReactDOM from "react-dom";

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

const App = () => {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2,
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3,
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  return courses.map((course) => <Course key={course.id} course={course} />);
};

ReactDOM.render(<App />, document.getElementById("root"));
