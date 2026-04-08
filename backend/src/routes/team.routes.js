import { Router } from 'express';
import { requireAuth } from '../middleware/auth.middleware.js';
import * as teamController from '../controllers/team.controller.js';

export const teamRouter = Router();

teamRouter.use(requireAuth);
teamRouter.get('/', teamController.list);
teamRouter.post('/move-from-backpack', teamController.moveFromBackpack);
teamRouter.post('/move-to-backpack', teamController.moveToBackpack);
teamRouter.post('/remove', teamController.removeFromTeam);
