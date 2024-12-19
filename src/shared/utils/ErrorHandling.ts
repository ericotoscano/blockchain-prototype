export default class ErrorHandling {
  public static handleStartupError(error: any): void {
    error instanceof Error ? console.error(`[error]: ${error.message}`) : console.error(`[error]: Unknown error occurred.`);

    process.exit(1);
  }

  public static initializeGlobalErrorHandlers(): void {
    process.on('uncaughtException', (error) => {
      console.error(`[process]: Uncaught Exception: ${error.message}`);
      process.exit(1);
    });

    process.on('unhandledRejection', (reason) => {
      console.error(`[process]: Unhandled Rejection: ${reason}`);
      process.exit(1);
    });
  }
}
