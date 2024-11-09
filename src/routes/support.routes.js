import { Router } from 'express';
import { getSupportTickets, createSupportTicket } from '../controllers/support.controller';

const router = Router();

router.get('/', getSupportTickets);
router.post('/', createSupportTicket);

export default router;
