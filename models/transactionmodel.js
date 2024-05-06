import mongoose from "mongoose";
const transactSchema = mongoose.Schema(
    {
        TransactionID: {
            type: String,
            required: true
        },
        CustomerName: {
            type: String,
            required: true
        },
        TransactionDate: {
            type: Date,
            required: true
        },
        Amount: {
            type: Number,
            required: true
        },
        Status: {
            type: String,
            required: true
        },
        InvoiceURL: {
            type: String,
            required: true
        }
});

export const Transaction = mongoose.model('Transaction', transactSchema);