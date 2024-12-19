import { Server } from 'http';
import ServerManagement from './ServerManagement';

export default class ServerListeningSetup {
  private readonly server: Server;
  private readonly port: number;

  constructor(private readonly serverManagement: ServerManagement) {
    this.server = this.serverManagement.getServer();
    this.port = this.serverManagement.getPort();
  }

  setupErrorListener() {
    this.server.on('error', (err: Error & { code?: string }) => {
      if (err.code == 'EADDRINUSE') {
        console.error(`[error]: The port ${this.port} is already in use.`);

        process.exit(1);
      }
    });
  }
}
