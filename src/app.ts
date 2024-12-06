import express, { Express, json } from 'express';

import blockchainRoutes from './routes/blockchain.routes';
import miningRoutes from './routes/mining.routes';

const createApp = (): Express => {
  const app: Express = express();

  app.use(json());

  app.use('/blockchain', blockchainRoutes);
  app.use('/mining', miningRoutes);

  return app;
};

export default createApp;
