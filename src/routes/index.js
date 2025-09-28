import { Router } from 'express';
import clientes from './clientes.js';
import ordenes from './ordenes.js';

const router = Router();

router.get('/health', (req, res) => {
  res.json({ ok: true, ts: new Date().toISOString() });
});

router.use('/clientes', clientes);
router.use('/ordenes', ordenes);

export default router;
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, '../public')));
