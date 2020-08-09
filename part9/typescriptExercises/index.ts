import express from 'express';

import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  if (height !== null && !isNaN(height) && weight !== null && !isNaN(weight)) {
    const bmi = calculateBmi(height, weight);
    res.send({
      weight: weight,
      height: height,
      bmi: bmi,
    });
  } else {
    res.send({
      error: 'malformatted parameters',
    });
  }
});

app.post('/exercises', (req, res) => {
  if (!req.body.target || !req.body.daily_exercises) {
    res.send({
      error: 'parameters missing',
    });
  }
  if (
    isNaN(
      req.body.target ||
        req.body.daily_exercises.array.forEach((element: number) => {
          isNaN(element);
        })
    )
  ) {
    res.send({
      error: 'malformatted parameters',
    });
  }
  const args: string[] = ['1', '1', req.body.target].concat(
    req.body.daily_exercises
  );
  const result = calculateExercises(args);
  res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
