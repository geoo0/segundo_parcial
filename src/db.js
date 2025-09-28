import { Pool } from 'pg';
import { config } from './config.js';

export const pool = new Pool(config.pg);

// Helper para prefijar esquema si no es "public"
export const T = (table) => {
  const schema = config.schema && config.schema !== 'public' ? config.schema : 'public';
  return `"${schema}"."${table}"`;
};

// Verificación simple de conexión al inicio
export async function verifyDb() {
  const client = await pool.connect();
  try {
    await client.query('SELECT NOW()');
    // Opcional: fijar search_path al arranque
    if (config.schema && config.schema !== 'public') {
      await client.query(`SET search_path TO ${config.schema}, public;`);
    }
    console.log('[DB] Conectado y verificado.');
  } finally {
    client.release();
  }
}
export async function diagDb() {
  const out = {};
  const q = async (label, sql, params=[]) => {
    try {
      const { rows } = await pool.query(sql, params);
      out[label] = rows;
    } catch (e) {
      out[label] = { error: e.message };
    }
  };

  await q('now', 'SELECT NOW() AS now');
  await q('whoami', 'SELECT current_user, session_user');
  await q('db', 'SELECT current_database() AS db');
  await q('schema', 'SELECT current_schema() AS schema');
  await q('search_path', 'SHOW search_path');
  await q('version', 'SELECT version()');
  // ¿Qué tablas existen en public o en tu schema alterno?
  await q('tables_public', `
    SELECT table_schema, table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public'
    ORDER BY 1, 2
  `);
  await q('tables_restaurante', `
    SELECT table_schema, table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'restaurante_ordenes_db'
    ORDER BY 1, 2
  `);
  // Pruebas directas
  await q('clientes_exists', `SELECT to_regclass($1) AS clientes_regclass`, [`${config.schema}.clientes`]);
  await q('ordenes_exists', `SELECT to_regclass($1) AS ordenes_regclass`, [`${config.schema}.ordenes`]);

  return out;
}
