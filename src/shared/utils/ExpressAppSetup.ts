import { Express, json } from 'express';

import blockchainRoutes from '../../routes/blockchain.routes';
import miningRoutes from '../../routes/mining.routes';

export default class ExpressAppSetup {
  constructor(private readonly app: Express) {
    this.setMiddlewares();
    this.setRoutes();
  }

  private setMiddlewares(): void {
    this.app.use(json());
  }

  private setRoutes(): void {
    this.app.use('/blockchain', blockchainRoutes);
    this.app.use('/mining', miningRoutes);
  }
}
