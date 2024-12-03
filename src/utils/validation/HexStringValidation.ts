export class HexStringValidation {
  static validateFormat(data: string, numberOfChar: number): boolean {
    const dataRegex = new RegExp(`^[0-9a-f]{${numberOfChar}}$`);

    return typeof data === 'string' && dataRegex.test(data);
  }
}
