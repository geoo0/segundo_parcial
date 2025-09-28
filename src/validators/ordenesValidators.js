import { body, param } from 'express-validator';

export const crearOrdenRules = [
  body('cliente_id').isInt({ min: 1 }).withMessage('cliente_id inválido'),
  body('platillo_nombre').isString().trim().isLength({ min: 2 }).withMessage('platillo_nombre requerido'),
  body('notes').optional().isString().withMessage('notes debe ser texto')
];

export const listarOrdenesRules = [
  param('clienteId').isInt({ min: 1 }).withMessage('clienteId inválido')
];

export const actualizarEstadoRules = [
  param('id').isInt({ min: 1 }).withMessage('id inválido'),
  body('estado')
    .isString()
    .trim()
    .isIn(['pending', 'preparing', 'delivered'])
    .withMessage('estado debe ser: pending | preparing | delivered')
];
