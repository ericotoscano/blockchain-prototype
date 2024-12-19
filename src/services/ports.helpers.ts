export const checkNodeUrl = (newNodeUrl: string): boolean => {
  const availablePorts = process.env.AVAILABLE_PORTS ? process.env.AVAILABLE_PORTS.split(',') : ['3000', '3001', '3002', '3003', '3004'];

  const baseUrl = process.env.BASE_URL || 'http://localhost:';

  if (!process.env.BASE_URL) {
    console.warn('[app]: No available base url specified in .env file. \n[app]: By default, the base url is going to be http://localhost.');
  }

  let nodeUrlOptions: string[] = [];

  for (const port of availablePorts) {
    nodeUrlOptions.push(`${baseUrl}${port}`);
  }

  return nodeUrlOptions.includes(newNodeUrl);
};

