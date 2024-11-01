import express, { Express, json } from 'express';

import blockchainRoutes from './routes/blockchain.routes';

const createApp = (): Express => {
  const app: Express = express();

  app.use(json());
  
  app.use('/blockchain', blockchainRoutes);
  
  return app;
};

export default createApp;