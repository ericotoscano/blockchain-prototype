import startServer, { setupCleanup } from './server';
import { addPortInEnv } from './helpers/ports.helpers';

const main = () => {
  const portArgument = process.argv[2];

  try {
    const portNumber = validatePort(portArgument);

    addPortInEnv(portNumber.toString());

    startServer(portNumber);

    setupCleanup(portNumber);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`[error]: ${error.message}`);
    } else {
      console.error(`[error]: Unknown error occurred.`);
    }

    process.exit(1);
  }
};

const validatePort = (port: string): number => {
  const portNumber = Number(port);

  if (isNaN(portNumber) || portNumber <= 0) {
    throw new Error(`The port '${port}' is not valid.`);
  }

  return portNumber;
};

main();
