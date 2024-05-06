import express from 'express';
import { Transaction } from '../models/transactionmodel.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const transactions = await Transaction.find()
        res.send(transactions);
        console.log(json(transactions))  
    }
    catch (error) {
        console.log(error)
    }
 })

 export default router;