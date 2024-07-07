import { Router } from 'express';
import {createReceipt} from "../controllers/receiptController.js";

const router = Router();

router.post('/create', createReceipt);

export default router;