export default class EnvFileService {
  static formatPortsOptions(portOptionsEnv: string = '3000,3001,3002,3003,3004'): number[] {
    return portOptionsEnv.split(',').map(Number);
  }
}
