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
