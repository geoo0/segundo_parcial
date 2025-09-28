import { Router } from 'express';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { registrarCliente, loginCliente } from '../controllers/clientesController.js';
import { registrarClienteRules, loginClienteRules } from '../validators/clientesValidators.js';

const router = Router();

router.post('/registrar', registrarClienteRules, asyncHandler(registrarCliente));

router.post('/login', loginClienteRules, asyncHandler(loginCliente));

export default router;
