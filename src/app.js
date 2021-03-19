import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import RateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import { healthRoute, teacherRoute, uploadRoute, connectRoute } from './routes/teacher';
import {  schoolRoute, imageUploadRoute, schoolConnectRoute } from './routes/school';
import {  parentRoute, imageUploadRoute2, parentConnectRoute } from './routes/parent';
import {schoolJobRoute } from './routes/jobSchool';
import {parentJobRoute } from './routes/jobParent';
import { Database } from './db';
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('../swagger.json');

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
app.use(express.json({ limit: '50mb' }));
app.use(limiter);
app.use(mongoSanitize());

// Endpoints
app.use('/api/', healthRoute);
app.use('/api/', teacherRoute);
app.use('/api/', schoolRoute);
app.use('/api/', parentRoute);
app.use('/api/', uploadRoute);
app.use('/api/', connectRoute);
app.use('/api/', imageUploadRoute);
app.use('/api/', imageUploadRoute2);
app.use('/api/', schoolConnectRoute)
app.use('/api/', schoolJobRoute)
app.use('/api/', parentJobRoute)
app.use('/api/', parentConnectRoute);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
export default app;
