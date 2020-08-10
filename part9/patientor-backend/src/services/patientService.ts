import patientData from '../../data/patients.json';

import { v4 as uuidv4 } from 'uuid';

import {
  NonSensitivePatientEntry,
  NewPatientEntry,
  PatientEntry,
} from '../types';

const patients: Array<PatientEntry> = patientData;

const getEntries = (): Array<NonSensitivePatientEntry> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addEntry = (entry: NewPatientEntry): PatientEntry => {
  const newPatientEntry = {
    id: uuidv4(),
    ...entry,
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getEntries,
  addEntry,
};
