export const getNodesUrlOptions = (): string[] => {
  const availablePorts = process.env.AVAILABLE_PORTS ? process.env.AVAILABLE_PORTS.split(',') : ['3000', '3001', '3002', '3003', '3004'];

  const baseUrl = process.env.BASE_URL || 'http://localhost:';

  if (!process.env.BASE_URL) {
    console.warn('[app]: No available base url specified in .env file. \n[app]: By default, the base url is going to be http://localhost.');
  }

  let nodeUrlOptions: string[] = [];

  for (const port of availablePorts) {
    nodeUrlOptions.push(`${baseUrl}${port}`);
  }

  return nodeUrlOptions;
};

export const checkAvailablePortsInEnv = (port: string): void => {
  const availablePorts = process.env.AVAILABLE_PORTS ? process.env.AVAILABLE_PORTS.split(',') : ['3000', '3001', '3002', '3003', '3004'];

  if (!process.env.AVAILABLE_PORTS) {
    console.warn('[app]: No available ports specified in .env file. \n[app]: By default, ports 3000, 3001, 3002, 3003 and 3004, if possible, will be the available ports.');
  }

  if (!availablePorts.includes(port)) {
    throw new Error(`The port '${port}' is not an available port. \n[app]: Check available ports specified in .env file.`);
  }
};

export const validatePort = (port: string): number => {
  const portNumber = Number(port);

  if (isNaN(portNumber) || portNumber <= 0) {
    throw new Error(`The port '${port}' is not valid.`);
  }

  return portNumber;
};
