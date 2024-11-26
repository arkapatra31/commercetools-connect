import * as dotenv from 'dotenv';
dotenv.config();

import app from './app';

const PORT = 8080;

// Listen the application
const server = app.listen(PORT, () => {
  console.info(`⚡️ Service application listening on port ${PORT}`);
});

export default server;
