import { Router } from 'express';
import { addSpending, deleteSpending, getSettings, listSpending, updateSettings } from '../controllers/plannerController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.use(requireAuth);
router.get('/settings', getSettings);
router.put('/settings', updateSettings);
router.get('/spending', listSpending);
router.post('/spending', addSpending);
router.delete('/spending/:id', deleteSpending);

export default router;
