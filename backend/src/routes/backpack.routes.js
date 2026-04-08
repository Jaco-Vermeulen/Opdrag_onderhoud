import { Router } from 'express';
import { requireAuth } from '../middleware/auth.middleware.js';
import * as backpackController from '../controllers/backpack.controller.js';

export const backpackRouter = Router();

backpackRouter.use(requireAuth);
backpackRouter.get('/', backpackController.list);
backpackRouter.post('/', backpackController.add);
backpackRouter.post('/remove', backpackController.remove);
