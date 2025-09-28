import { Router } from 'express';
import clientes from './clientes.js';
import ordenes from './ordenes.js';
import { diagDb } from '../db.js';   // <— importa arriba

const router = Router();

router.get('/health', (_req, res) => {
  res.json({ ok: true, ts: new Date().toISOString() });
});

// Diagnóstico DB (temporal)
router.get('/_diag/db', async (_req, res) => {
  try {
    const info = await diagDb();
    res.json({ ok: true, info });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

router.use('/clientes', clientes);
router.use('/ordenes', ordenes);

export default router;
