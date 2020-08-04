const calculateBmi = (height: number, weight: number) => {
    const bmi = weight / ((height / 100) * (height / 100));
    let message = '';
    if (bmi < 18.5) {
        message = 'Underweight (uhealthy weight)';
    } else if (bmi < 25) {
        message = 'Normal (healthy weight)';
    } else if (bmi < 30) {
        message = 'Overweight (unhealthy weight)';
    } else {
        message = 'Obese (unhealthy weight)';
    }
    console.log(message)
}

try {
    if (process.argv.length < 4) throw new Error('Not enough arguments');
    if (process.argv.length > 4) throw new Error('Too many arguments');
    if (!isNaN(Number(process.argv[2])) && !isNaN(Number(process.argv[3]))) {
        const height = Number(process.argv[2]);
        const weight = Number(process.argv[3]);
        calculateBmi(height, weight);
    } else {
        throw new Error('Provided values were not numbers!');
    }
} catch (e) {
    console.log('Error, something bad happened, message: ', e.message);
}



