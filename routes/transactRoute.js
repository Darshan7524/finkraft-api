import express from 'express';
import { Transaction } from '../models/transactionmodel.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.send(transactions);
    } catch (error) {
        console.error('Error retrieving transactions:', error);
        res.status(500).send('Internal Server Error');
    }
});


router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { TransactionID, CustomerName, TransactionDate, Amount, Status, InvoiceURL } = req.body;

    try {
        const updatedTransaction = await Transaction.findOneAndUpdate(
            { TransactionID: id },
            { TransactionID, CustomerName, TransactionDate, Amount, Status, InvoiceURL },
            { new: true }
        );

        if (!updatedTransaction) {
            return res.status(404).send('Transaction not found');
        }

        res.send(updatedTransaction);
    } catch (error) {
        console.error('Error updating transaction:', error);
        res.status(500).send('Internal Server Error');
    }
});


router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedTransaction = await Transaction.findOneAndDelete({ TransactionID: id });

        if (!deletedTransaction) {
            return res.status(404).send('Transaction not found');
        }

        res.send(deletedTransaction);
    } catch (error) {
        console.error('Error deleting transaction:', error);
        res.status(500).send('Internal Server Error');
    }
});

 export default router;