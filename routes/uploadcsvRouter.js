

import express from 'express';
import multer from 'multer';
import csvParser from 'csv-parser';
import fs from 'fs';
import { Transaction } from '../models/transactionmodel.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); 

router.post('/', upload.single('csvFile'), (req, res) => {
    const csvData = [];
    fs.createReadStream(req.file.path)
        .pipe(csvParser())
        .on('data', (row) => {
            csvData.push(row);
        })
        .on('end', () => {
            Transaction.insertMany(csvData, (err, docs) => {
                if (err) {
                    console.error('Error inserting CSV data:', err);
                    res.status(500).send('Internal Server Error');
                } else {
                    console.log('CSV data inserted successfully');
                    res.status(200).send('CSV data inserted successfully');
                }
            });
        });
});

export default router;

