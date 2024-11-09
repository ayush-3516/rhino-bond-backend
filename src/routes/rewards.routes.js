import { Router } from 'express';
import { getRewards, addReward } from '../controllers/rewards.controller';

const router = Router();

router.get('/', getRewards);
router.post('/', addReward);

export default router;
