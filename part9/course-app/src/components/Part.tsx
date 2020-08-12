import React from 'react';

import { CoursePart } from '../types';

const Part: React.FC<{ part: CoursePart }> = ({ part }) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  switch (part.name) {
    case 'Fundamentals':
      return (
        <div>
          <p>
            {part.name} {part.description} {part.exerciseCount}
          </p>
        </div>
      );
    case 'Using props to pass data':
      return (
        <div>
          <p>
            {part.name} {part.exerciseCount} {part.groupProjectCount}
          </p>
        </div>
      );
    case 'Deeper type usage':
      return (
        <div>
          <p>
            {part.name} {part.description}
            {part.exerciseCount} {part.exerciseSubmissionLink}
          </p>
        </div>
      );
    case 'Course with comments':
      return (
        <div>
          <p>
            {part.name} {part.description}
            {part.exerciseCount} {part.comment}
          </p>
        </div>
      );
    default:
      return assertNever(part);
  }
};

export default Part;
