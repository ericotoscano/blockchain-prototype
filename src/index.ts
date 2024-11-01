import 'dotenv/config';

import { startServer, setupCleanup } from './server';

import { validatePort, checkAvailablePortsInEnv } from './helpers/ports.helpers';

const main = () => {
  const portArgument = process.argv[2];

  try {
    const portNumber = validatePort(portArgument);

    checkAvailablePortsInEnv(portNumber.toString());

    const server = startServer(portNumber);

    setupCleanup(server);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`[error]: ${error.message}`);
    } else {
      console.error(`[error]: Unknown error occurred.`);
    }

    process.exit(1);
  }
};

main();
