import * as dotenv from 'dotenv';
dotenv.config();
import express, { Express } from 'express';

// Import routes
import ServiceRoutes from './routes/service.route';

// Create the express app
const app: Express = express();

// Define configurations
app.use(express.json());

// Define routes
app.post('/', ServiceRoutes);

export default app;
