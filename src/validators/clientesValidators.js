import { body } from 'express-validator';

export const registrarClienteRules = [
  body('nombre').isString().trim().isLength({ min: 2 }).withMessage('nombre requerido (min 2)'),
  body('email').isEmail().withMessage('email inválido'),
  body('telefono').isString().trim().isLength({ min: 3 }).withMessage('telefono requerido')
];

export const loginClienteRules = [
  body('email').isEmail().withMessage('email inválido'),
  body('telefono').isString().trim().isLength({ min: 3 }).withMessage('telefono inválido')
];
