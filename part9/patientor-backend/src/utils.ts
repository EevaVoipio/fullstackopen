import { v4 as uuidv4 } from 'uuid';
import {
  NewPatientEntry,
  Gender,
  Entry,
  HealthCheckEntry,
  HospitalEntry,
  OccupationalHealthcareEntry,
  HealthCheckRating,
} from './types';

const toNewPatientEntry = (object: {
  name: any;
  dateOfBirth: any;
  ssn: any;
  gender: any;
  occupation: any;
  entries?: any;
}): NewPatientEntry => {
  return {
    name: parseString(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseString(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseString(object.occupation),
    entries: parseEntryArray(object.entries),
  };
};

const parseEntryArray = (entries: any): Array<Entry> => {
  return entries
    ? entries.map((entry: Entry) => {
        return isValidType(entry.type) ? entry : undefined;
      })
    : [];
};

const toNewEntry = (object: {
  type: any;
  description: any;
  date: any;
  specialist: any;
  diagnosisCodes?: any[];
  discharge?: {
    date: any;
    criteria: any;
  };
  healthCheckRating?: any;
  sickLeave?: {
    startDate: any;
    endDate: any;
  };
  employerName?: any;
}): HealthCheckEntry | HospitalEntry | OccupationalHealthcareEntry => {
  switch (object.type) {
    case 'HealthCheck':
      return {
        id: uuidv4(),
        type: parseType(object.type),
        description: parseString(object.description),
        date: parseDate(object.date),
        specialist: parseString(object.specialist),
        diagnosisCodes: object.diagnosisCodes?.map((diagnosis) =>
          parseString(diagnosis)
        ),
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
      };
    case 'Hospital':
      return {
        id: uuidv4(),
        type: parseType(object.type),
        description: parseString(object.description),
        date: parseDate(object.date),
        specialist: parseString(object.specialist),
        diagnosisCodes: object.diagnosisCodes?.map((diagnosis) =>
          parseString(diagnosis)
        ),
        discharge: {
          date: parseDate(object.discharge?.date),
          criteria: parseString(object.discharge?.criteria),
        },
      };
    case 'OccupationalHealthcare':
      return {
        id: uuidv4(),
        type: parseType(object.type),
        description: parseString(object.description),
        date: parseDate(object.date),
        specialist: parseString(object.specialist),
        diagnosisCodes: object.diagnosisCodes?.map((diagnosis) =>
          parseString(diagnosis)
        ),
        employerName: parseString(object.employerName),
        sickLeave: {
          startDate: parseDate(object.sickLeave?.startDate),
          endDate: parseDate(object.sickLeave?.endDate),
        },
      };
    default:
      throw Error('Invalid type!');
  }
};

const parseType = (type: any) => {
  if (!isValidType(type)) {
    throw new Error('Invalid entry type ' + type);
  }
  return type;
};

const isValidType = (type: string): boolean => {
  if (
    type !== 'Hospital' &&
    type !== 'HealthCheck' &&
    type !== 'OccupationalHealthcare'
  ) {
    throw new Error('Invalid entry type ' + type);
  }
  return true;
};

const parseString = (comment: any): string => {
  if (!comment || !isString(comment)) {
    throw new Error('Incorrect or missing comment: ' + comment);
  }

  return comment;
};

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

const parseHealthCheckRating = (rating: any): HealthCheckRating => {
  if (!rating || !isHealthCheckRating(rating)) {
    throw new Error('Incorrect or missing rating: ' + rating);
  }
  return rating;
};

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseGender = (weather: any): Gender => {
  if (!weather || !isGender(weather)) {
    throw new Error('Incorrect or missing weather: ' + weather);
  }
  return weather;
};

export { toNewPatientEntry, toNewEntry };
