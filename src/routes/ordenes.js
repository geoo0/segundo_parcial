import { Router } from 'express';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { crearOrden, listarOrdenesPorCliente, actualizarEstadoOrden } from '../controllers/ordenesController.js';
import { crearOrdenRules, listarOrdenesRules, actualizarEstadoRules } from '../validators/ordenesValidators.js';

const router = Router();

router.post('/', crearOrdenRules, asyncHandler(crearOrden));

router.get('/:clienteId', listarOrdenesRules, asyncHandler(listarOrdenesPorCliente));

router.put('/:id/estado', actualizarEstadoRules, asyncHandler(actualizarEstadoOrden));

export default router;
