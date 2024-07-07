import { createReceiptModel } from '../models/receiptModel.js';

export const createReceipt = async (req, res) => {
  try {
    const receiptId = await createReceiptModel(req.body);

    res.status(201).json({ receiptId });
  } catch (error) {
    console.error('Error creating receipt:', error);
    res.status(500).json({ error: 'An error occurred while creating the receipt.' });
  }
};