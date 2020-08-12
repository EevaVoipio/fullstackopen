import express from 'express';

import patientService from '../services/patientService';
import { toNewPatientEntry, toNewEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPatients());
});

router.post('/', (req, res) => {
  const newPatientEntry = toNewPatientEntry(req.body);
  const addedPatientEntry = patientService.addPatient(newPatientEntry);
  res.send(addedPatientEntry);
});

router.post('/:id/entries', (req, res) => {
  const newEntry = toNewEntry(req.body);
  const addedPatientEntry = patientService.addEntry(req.params.id, newEntry);
  res.send(addedPatientEntry);
});

router.get('/:id', (req, res) => {
  const patient = patientService.findById(req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

export default router;
