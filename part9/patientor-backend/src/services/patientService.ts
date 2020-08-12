import { v4 as uuidv4 } from 'uuid';

import patientData from '../../data/patients';
import { toNewPatientEntry, toNewEntry } from '../utils';

import {
  NonSensitivePatientEntry,
  NewPatientEntry,
  PatientEntry,
  NewEntry,
  HealthCheckEntry,
  HospitalEntry,
  OccupationalHealthcareEntry,
} from '../types';

let patients: PatientEntry[] = patientData.map((obj) => {
  const object = toNewPatientEntry(obj) as PatientEntry;
  object.id = obj.id;
  return object;
});

const getPatients = (): Array<NonSensitivePatientEntry> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (entry: NewPatientEntry): PatientEntry => {
  const newPatientEntry = {
    id: uuidv4(),
    ...entry,
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const addEntry = (
  id: string,
  entry: NewEntry
): HealthCheckEntry | HospitalEntry | OccupationalHealthcareEntry => {
  const patient = patients.find((patient) => patient.id === id);
  if (patient === undefined) {
    throw new Error('Entry can not be added as the patient does not exist');
  }
  const newEntry = toNewEntry(entry);
  const updatedPatient = {
    ...patient,
    entries: patient.entries?.concat(newEntry),
  };
  patients = patients.map((patient) =>
    patient.id === id ? updatedPatient : patient
  );
  return newEntry;
};

const findById = (id: string): PatientEntry | undefined => {
  const entry = patients.find((patient) => patient.id === id);
  return entry;
};

export default {
  getPatients,
  addPatient,
  addEntry,
  findById,
};
