import { Server } from 'http';
import { Express } from 'express';

export default class ServerManagement {
  private readonly server: Server;

  constructor(private readonly port: number, private readonly app: Express) {
    this.server = this.startServer();
  }

  private startServer(): Server {
    return this.app.listen(this.port, () => {
      console.log(`[server]: Server is running at http://localhost:${this.port}`);
    });
  }

  closeServer(): void {
    this.server.close(() => {
      console.log('[server]: Server has been shut down.');

      process.exit(0);
    });
  }

  getServer(): Server {
    return this.server;
  }

  getPort(): number {
    return this.port;
  }
}
