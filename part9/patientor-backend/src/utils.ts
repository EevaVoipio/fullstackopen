import { NewPatientEntry, Gender } from './types';

const toNewPatientEntry = (object: { name: any; dateOfBirth: any; ssn: any; gender: any; occupation: any; }): NewPatientEntry => { 
    return {
      name: parseString(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseString(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseString(object.occupation)
  };
};

const parseString = (comment: any): string => {
  if (!comment || !isString(comment)) {
    throw new Error('Incorrect or missing comment: ' + comment);
  }

  return comment;
}

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (weather: any): Gender => {
  if (!weather || !isGender(weather)) {
      throw new Error('Incorrect or missing weather: ' + weather);
  }
  return weather;
};

export default toNewPatientEntry;