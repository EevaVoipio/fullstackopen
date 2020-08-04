const calculateBmi = (height: number, weight: number): string => {
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
    return message;
}

console.log(calculateBmi(180, 74));
