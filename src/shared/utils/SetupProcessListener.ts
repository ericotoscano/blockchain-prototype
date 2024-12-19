import ServerManagement from './ServerManagement';

export default class ProcessListeningSetup {
  constructor(private readonly serverManagement: ServerManagement) {}

  setupGracefulShutdown(): void {
    this.handleSignals();
    this.handleExitEvent();
  }

  private handleSignals(): void {
    const signals: NodeJS.Signals[] = ['SIGTERM', 'SIGINT', 'SIGHUP', 'SIGQUIT'];

    signals.forEach((signal) => {
      process.on(signal, () => {
        console.log(`[process]: Received ${signal}, shutting down...`);
        this.serverManagement.closeServer();
      });
    });
  }

  private handleExitEvent(): void {
    process.on('exit', (code) => {
      console.log(`[process]: Process exiting with code ${code}`);
      this.serverManagement.closeServer();
    });
  }
}
