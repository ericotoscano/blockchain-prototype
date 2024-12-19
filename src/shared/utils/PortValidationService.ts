export default class PortValidationService {
  constructor(port: number, portOptions: number[]) {
    this.validateFormat(port);
    this.validateOption(port, portOptions);
  }

  private validateFormat(port: number): void {
    if (isNaN(port) || port <= 0) {
      throw new Error(`[error]: The port is an invalid number.`);
    }
  }

  private validateOption(port: number, portOptions: number[]): void {
    if (!portOptions.includes(port)) {
      throw new Error(`[error]: The port '${port}' is an invalid option. Ports Options: ${portOptions}.`);
    }
  }
}
