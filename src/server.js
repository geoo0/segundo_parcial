import app from './app.js';
import { config } from './config.js';
import { verifyDb } from './db.js';

const { port } = config;

(async () => {
  await verifyDb();
  app.listen(port, () => {
    console.log(`API escuchando en http://localhost:${port}/api`);
  });
})();
