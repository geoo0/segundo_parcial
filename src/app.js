import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import routes from './routes/index.js';
import { errorHandler } from './middleware/errorHandler.js';
import { config } from './config.js';

const app = express();

app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, '../public')));

const corsOptions = {
  origin: (origin, cb) => {
    if (!origin) return cb(null, true); 
    if (config.corsOrigins.length === 0 || config.corsOrigins.includes(origin)) {
      return cb(null, true);
    }
    return cb(new Error('Origen no permitido por CORS'));
  }
};
app.use(cors(corsOptions));

app.use('/api', routes);

app.use(errorHandler);

export default app;
