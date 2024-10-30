import * as fs from 'fs';
import * as path from 'path';

export const getNodesUrlOptions = (): string[] => {
  const portsNumbers: string[] = process.env.PORTS_NUMBERS ? process.env.PORTS_NUMBERS.split(',') : [];

  let nodeUrlOptions: string[] = [];

  for (const port of portsNumbers) {
    nodeUrlOptions.push(`${process.env.BASE_URL}${port}`);
  }

  return nodeUrlOptions;
};

export const addPortInEnv = (portNumber: string): void => {
  const envFilePath = path.join(__dirname, '../../.env');

  let envContent = '';
  let runningPorts: string[] = [];

  if (fs.existsSync(envFilePath)) {
    envContent = fs.readFileSync(envFilePath, 'utf-8');
    const portsLine = envContent.split('\n').find((line) => line.startsWith('RUNNING_PORTS='));
    if (portsLine) {
      runningPorts = portsLine
        .replace('RUNNING_PORTS=', '')
        .split(',')
        .map((port) => port.trim())
        .filter(Boolean);
    }
  }

  if (!runningPorts.includes(portNumber)) {
    runningPorts.push(portNumber);
  }

  const updatedPortsLine = `RUNNING_PORTS=${runningPorts.join(',')}`;

  const updatedEnvContent = envContent
    .split('\n')
    .map((line) => (line.startsWith('RUNNING_PORTS=') ? updatedPortsLine : line))
    .join('\n');

  fs.writeFileSync(envFilePath, updatedEnvContent, 'utf-8');
};

export const removePortFromEnv = (portNumber: string): void => {
  const envFilePath = path.join(__dirname, '../../.env');

  let envContent = '';
  let runningPorts: string[] = [];

  if (fs.existsSync(envFilePath)) {
    envContent = fs.readFileSync(envFilePath, 'utf-8');
    
    const portsLine = envContent.split('\n').find(line => line.startsWith('RUNNING_PORTS='));
    
    if (portsLine) {
      runningPorts = portsLine.replace('RUNNING_PORTS=', '').split(',').map(port => port.trim()).filter(Boolean);
    }
  }

  runningPorts = runningPorts.filter(port => port !== portNumber);

  const updatedPortsLine = `RUNNING_PORTS=${runningPorts.join(',')}`;

  const updatedEnvContent = envContent.split('\n').map(line => 
    line.startsWith('RUNNING_PORTS=') ? updatedPortsLine : line
  ).join('\n');

  fs.writeFileSync(envFilePath, updatedEnvContent, 'utf-8');
};
