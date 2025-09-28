import { validationResult } from 'express-validator';
import { pool, T } from '../db.js';

export const registrarCliente = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = new Error('Validación fallida');
    err.type = 'validation';
    err.details = errors.array();
    throw err;
  }

  const { nombre, email, telefono } = req.body;

  // Checar único email
  const exists = await pool.query(`SELECT id FROM ${T('clientes')} WHERE email = $1`, [email]);
  if (exists.rowCount > 0) {
    const err = new Error('El email ya está registrado');
    err.type = 'conflict';
    throw err;
  }

  const insert = await pool.query(
    `INSERT INTO ${T('clientes')} (nombre, email, telefono) VALUES ($1, $2, $3) RETURNING id, nombre, email, telefono, creado`,
    [nombre, email, telefono]
  );

  return res.status(201).json(insert.rows[0]);
};

export const loginCliente = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = new Error('Validación fallida');
    err.type = 'validation';
    err.details = errors.array();
    throw err;
  }

  const { email, telefono } = req.body;

  const result = await pool.query(
    `SELECT id, nombre, email, telefono, creado FROM ${T('clientes')} WHERE email = $1 AND telefono = $2`,
    [email, telefono]
  );

  if (result.rowCount === 0) {
    const err = new Error('Credenciales inválidas');
    err.type = 'not_found';
    throw err;
  }

  return res.json(result.rows[0]);
};
