

import express from 'express';
import multer from 'multer';
import csvParser from 'csv-parser';
import fs from 'fs';
import { Transaction } from '../models/transactionmodel.js';
import bodyParser from "body-parser";
import csv from "csvtojson";
const router = express.Router();
const upload = multer({ dest: 'uploads/' }); 

router.post('/', upload.single('file'), async (req, res, next) => {
    try {
        const jsonArray = await csvtojson().fromFile(req.file.path);

        const transactions = jsonArray.map(item => ({
            TransactionID: item['Transaction ID'],
            CustomerName: `${item['First Name']} ${item['Last Name']}`,
            TransactionDate: new Date(item['Transaction Date']),
            Amount: parseFloat(item['Amount']),
            Status: item['Status'],
            InvoiceURL: item['Invoice URL']
        }));

        

        await Transaction.insertMany(transactions);

        res.status(200).send({
            message: "Successfully Uploaded!"
        });
    } catch (error) {
        console.error("Error processing CSV:", error);
        res.status(500).send({
            message: "Failure",
            error: error.message
        });
    } finally {
        
        fs.unlinkSync(req.file.path);
    }
});

export default router;

