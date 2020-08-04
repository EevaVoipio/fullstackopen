const calculateExercises = (hours: Array<number>, target: number): ExerciseResults => {
    const averageTrainingHours = hours.reduce((a, b) => a + b, 0) / hours.length;
    let rating = 0;
    let ratingDescription = "";
    if (averageTrainingHours >= target) {
        rating = 3;
        ratingDescription = "Very good!"
    } else if (averageTrainingHours >= target / 2) {
        rating = 2;
        ratingDescription = "Not too bad, but could be even better."
    } else {
        rating = 1;
        ratingDescription = "Try to exercise more next week!"
    }
    const exerciseResults: ExerciseResults = {
        periodLength: hours.length,
        trainingDays: hours.filter(hour => hour > 0).length,
        success: averageTrainingHours >= target,
        rating: rating,
        ratingDescription: ratingDescription,
        target: target,
        average: averageTrainingHours
    }
    return exerciseResults;
}

interface ExerciseResults {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2)); 