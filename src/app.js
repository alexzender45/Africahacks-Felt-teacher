import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import RateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import { healthRoute, teacherRoute } from './routes';
import { Database } from './db';

//
// Initialize DB
Database.db().then();

// Configs
const app = express();
const limiter = new RateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests.'
});

// Middleware
app.enable('trust proxy');
app.use(cors());
app.use(helmet());
app.use(express.json({ limit: '10kb' }));
app.use(limiter);
app.use(mongoSanitize());
app.use(express.static(`${__dirname}/uploads`));

// Endpoints
app.use('/api/', healthRoute);
app.use('/api/', teacherRoute);

export default app;
