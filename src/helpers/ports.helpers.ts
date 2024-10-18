export const getNodesUrlOptions = (): string[] => {
  const portsNumbers: string[] = process.env.PORTS_NUMBERS ? process.env.PORTS_NUMBERS.split(',') : [];

  let nodeUrlOptions: string[] = [];

  for (const port of portsNumbers) {
    nodeUrlOptions.push(`${process.env.BASE_URL}${port}`);
  }

  return nodeUrlOptions;
};
