import express, { Express, json } from 'express';
import 'dotenv/config';

import blockchainRoutes from '../src/routes/blockchain.routes';
import nodesRoutes from '../src/routes/nodes.routes';

const app: Express = express();

const portNumber: string = process.argv[2];

const portsNumbers: string[] = process.env.PORTS_NUMBERS ? process.env.PORTS_NUMBERS.split(',') : [];

if (!portNumber || isNaN(Number(portNumber)) || !portsNumbers.includes(portNumber)) {
  console.error(`[error]: Invalid port '${portNumber}'. Make sure it is specified in the .env file.`);
  process.exit(1);
}

app.use(json());

app.use('/blockchain', blockchainRoutes);
app.use('/nodes', nodesRoutes);

const server = app.listen(portNumber, () => {
  console.log(`[server]: Server is running at http://localhost:${portNumber}`);
});

server.on('error', (err: Error & { code?: string }) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`[error]: The port ${portNumber} is already in use.`);
    process.exit(1);
  }
});
