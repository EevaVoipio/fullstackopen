export const calculateExercises = (args: Array<string>): ExerciseResults => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (isNaN(Number(args[2]))) {
    throw new Error('Provided values were not numbers!');
  }
  const target = Number(args[2]);
  const hours: Array<number> = [];
  let hour: number;
  for (hour = 3; hour < args.length; hour++) {
    if (!isNaN(Number(args[hour]))) {
      hours.push(Number(args[hour]));
    } else {
      throw new Error('Provided values were not numbers!');
    }
  }
  const averageTrainingHours = hours.reduce((a, b) => a + b, 0) / hours.length;
  let rating = 0;
  let ratingDescription = '';
  if (averageTrainingHours >= target) {
    rating = 3;
    ratingDescription = 'Very good!';
  } else if (averageTrainingHours >= target / 2) {
    rating = 2;
    ratingDescription = 'Not too bad, but could be even better.';
  } else {
    rating = 1;
    ratingDescription = 'Try to exercise more next week!';
  }
  const exerciseResults: ExerciseResults = {
    periodLength: hours.length,
    trainingDays: hours.filter((hour) => hour > 0).length,
    success: averageTrainingHours >= target,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: averageTrainingHours,
  };
  return exerciseResults;
};

interface ExerciseResults {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

try {
  calculateExercises(process.argv);
} catch (e) {
  console.log('Error, something bad happened, message: ', e.message);
}
//console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
