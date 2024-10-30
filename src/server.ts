import createApp from './app';
import { removePortFromEnv } from './helpers/ports.helpers';
import { Server } from 'http';

const startServer = (port: number): Server => {
  const app = createApp();
  
  const server = app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });

  server.on('error', (err: Error & { code?: string }) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`[error]: The port ${port} is already in use.`);
      process.exit(1);
    }
  });

  return server;
};

export const setupCleanup = (port: number): void => {
  let cleanupDone = false;

  const cleanup = () => {
    if (!cleanupDone) {
      removePortFromEnv(port.toString());
  
      console.log(`[server]: Port ${port} removed from RUNNING_PORTS.`);
  
      cleanupDone = true;
    }
  };

  process.on('SIGINT', cleanup);
  process.on('exit', cleanup);
};

export default startServer;