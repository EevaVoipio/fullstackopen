import express from 'express';

import patientService from '../services/patientService';
import toNewPatientEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getEntries());
});

router.post('/', (req, res) => {
  const newPatientEntry = toNewPatientEntry(req.body);
  const addedPatientEntry = patientService.addEntry(newPatientEntry);
  res.send(addedPatientEntry);
});

export default router;
