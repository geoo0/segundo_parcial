import { validationResult } from 'express-validator';
import { pool, T } from '../db.js';

export const crearOrden = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = new Error('Validación fallida');
    err.type = 'validation';
    err.details = errors.array();
    throw err;
  }

  const { cliente_id, platillo_nombre, notes } = req.body;

  // Verificar que el cliente exista
  const cli = await pool.query(`SELECT id FROM ${T('clientes')} WHERE id = $1`, [cliente_id]);
  if (cli.rowCount === 0) {
    const err = new Error('Cliente no existe');
    err.type = 'not_found';
    throw err;
  }

  const insert = await pool.query(
    `INSERT INTO ${T('ordenes')} (cliente_id, platillo_nombre, notes)
     VALUES ($1, $2, $3)
     RETURNING id, cliente_id, platillo_nombre, notes, estado, creado`,
    [cliente_id, platillo_nombre, notes ?? null]
  );

  return res.status(201).json(insert.rows[0]);
};

export const listarOrdenesPorCliente = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = new Error('Validación fallida');
    err.type = 'validation';
    err.details = errors.array();
    throw err;
  }

  const clienteId = Number(req.params.clienteId);

  const rows = await pool.query(
    `SELECT id, cliente_id, platillo_nombre, notes, estado, creado
     FROM ${T('ordenes')}
     WHERE cliente_id = $1
     ORDER BY creado DESC`,
    [clienteId]
  );

  return res.json(rows.rows);
};

export const actualizarEstadoOrden = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = new Error('Validación fallida');
    err.type = 'validation';
    err.details = errors.array();
    throw err;
  }

  const id = Number(req.params.id);
  const { estado } = req.body;

  const upd = await pool.query(
    `UPDATE ${T('ordenes')}
     SET estado = $1
     WHERE id = $2
     RETURNING id, cliente_id, platillo_nombre, notes, estado, creado`,
    [estado, id]
  );

  if (upd.rowCount === 0) {
    const err = new Error('Orden no encontrada');
    err.type = 'not_found';
    throw err;
  }

  return res.json(upd.rows[0]);
};
