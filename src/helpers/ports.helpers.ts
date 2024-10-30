import 'dotenv/config';

export const getNodesUrlOptions = (): string[] => {
  const availablePorts: string[] = process.env.AVAILABLE_PORTS ? process.env.AVAILABLE_PORTS.split(',') : [];

  let nodeUrlOptions: string[] = [];

  for (const port of availablePorts) {
    nodeUrlOptions.push(`${process.env.BASE_URL}${port}`);
  }

  return nodeUrlOptions;
};

export const checkAvailablePortsInEnv = (port: string): void => {
  let availablePorts: string[] = process.env.AVAILABLE_PORTS ? process.env.AVAILABLE_PORTS.split(',') : [];

  if (!availablePorts.includes(port)) {
    throw new Error(`The port '${port}' is not an available port in .env file.`);
  }
};

export const validatePort = (port: string): number => {
  const portNumber = Number(port);

  if (isNaN(portNumber) || portNumber <= 0) {
    throw new Error(`The port '${port}' is not valid.`);
  }

  return portNumber;
};
