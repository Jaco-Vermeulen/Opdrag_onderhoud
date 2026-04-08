import { Router } from 'express';
import { requireAuth } from '../middleware/auth.middleware.js';
import * as pokemonController from '../controllers/pokemon.controller.js';

export const pokemonRouter = Router();

pokemonRouter.get('/search', requireAuth, pokemonController.search);
pokemonRouter.get('/:pokeapiId/evolution', requireAuth, pokemonController.getEvolutionChain);
pokemonRouter.get('/:pokeapiId', requireAuth, pokemonController.getById);
