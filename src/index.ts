import 'dotenv/config';
import express, { Express } from 'express';
import ServerManagement from './shared/utils/ServerManagement';
import ExpressAppSetup from './shared/utils/ExpressAppSetup';
import ServerListeningSetup from './shared/utils/SetupServerListener';
import ProcessListeningSetup from './shared/utils/SetupProcessListener';
import PortValidationService from './shared/utils/PortValidationService';
import EnvFileService from './shared/utils/EnvFileService';
import ErrorHandling from './shared/utils/ErrorHandling';
import AppInputService from './shared/utils/AppInputService';

ErrorHandling.initializeGlobalErrorHandlers();

const main = async (): Promise<void> => {
  try {
    const port: number = AppInputService.formatInput(process.argv[2]);
    const portOptions: number[] = EnvFileService.formatPortsOptions(process.env.PORTS_OPTIONS);
    new PortValidationService(port, portOptions);

    const app: Express = express();
    new ExpressAppSetup(app);

    const serverManagement = new ServerManagement(port, app);
    const serverListeningSetup = new ServerListeningSetup(serverManagement);
    const processListeningSetup = new ProcessListeningSetup(serverManagement);

    serverListeningSetup.setupErrorListener();
    processListeningSetup.setupGracefulShutdown();
  } catch (error: any) {
    ErrorHandling.handleStartupError(error);
  }
};

main();
