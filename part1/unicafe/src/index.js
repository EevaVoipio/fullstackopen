import React, { useState } from "react";
import ReactDOM from "react-dom";

const Header = ({ name }) => {
  return <h1>{name}</h1>;
};

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const total = ({ feedbacks }) => {
  return feedbacks.reduce((a, b) => a + b, 0);
};

const average = ({ good, neutral, bad }) => {
  const total = good - bad;
  const count = good + neutral + bad;
  return count === 0 ? 0 : total / count;
};

const positive = ({ good, neutral, bad }) => {
  const positive = good;
  const count = good + neutral + bad;
  return count === 0 ? 0 + "%" : (100 * positive) / count + "%";
};

const Statistic = ({ text, value }) => {
  return (
    <td>
      {text} {value}
    </td>
  );
};

const Statistics = ({ good, neutral, bad, feedbacks }) => {
  return (
    <table>
      <tbody>
        <tr>
          <Statistic text="good" value={good} />
        </tr>
        <tr>
          <Statistic text="neutral" value={neutral} />
        </tr>
        <tr>
          <Statistic text="bad" value={bad} />
        </tr>
        <tr>
          <Statistic text="total" value={total({ feedbacks })} />
        </tr>
        <tr>
          <Statistic text="average" value={average({ good, neutral, bad })} />
        </tr>
        <tr>
          <Statistic text="positive" value={positive({ good, neutral, bad })} />
        </tr>
      </tbody>
    </table>
  );
};

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const feedbacks = [good, neutral, bad];

  const handleSetGood = () => {
    setGood(good + 1);
  };

  const handleSetNeutral = () => {
    setNeutral(neutral + 1);
  };

  const handleSetBad = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <Header name="give feedback" />
      <Button handleClick={handleSetGood} text="good" />
      <Button handleClick={handleSetNeutral} text="neutral" />
      <Button handleClick={handleSetBad} text="bad" />
      <Header name="statistics" />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        feedbacks={feedbacks}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
