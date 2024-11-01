import { Server } from 'http';

import createApp from './app';

export const startServer = (port: number): Server => {
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

export const setupCleanup = (server: Server): void => {
  const cleanup = () => {
    server.close(() => {
      console.log('[server]: Server has been shut down.');
      process.exit(0);
    });
  };

  process.on('SIGINT', cleanup);
  process.on('exit', cleanup);
};
