import { Router } from 'express';
import clientes from './clientes.js';
import ordenes from './ordenes.js';

const router = Router();

router.get('/health', (_req, res) => {
  res.json({ ok: true, ts: new Date().toISOString() });
});

router.use('/clientes', clientes);
router.use('/ordenes', ordenes);

export default router;

