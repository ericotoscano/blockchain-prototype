import express, { Express, json } from 'express';
import 'dotenv/config';

import blockchainRoutes from '../src/routes/blockchain.routes';
import transactionsRoutes from './routes/transactions.routes';

const app: Express = express();

const port: string = process.argv[2];

const ports: string[] = process.env.PORTS ? process.env.PORTS.split(',') : [];

if (!port || isNaN(Number(port)) || !ports.includes(port)) {
  console.error(`[error]: Invalid port '${port}'. Make sure it is specified in the .env file.`);
  process.exit(1);
}

app.use(json());

app.use('/blockchain', blockchainRoutes);
app.use('/transactions', transactionsRoutes);

const server = app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

server.on('error', (err: Error & { code?: string }) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`[error]: The port ${port} is already in use.`);
    process.exit(1);
  }
});
