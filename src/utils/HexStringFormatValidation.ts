export type HexStringFormatValidationType = {
  validate(data: string, numberOfChar: number): boolean;
};

export class HexStringFormatValidation {
  static validate(data: string, numberOfChar: number): boolean {
    const dataRegex = new RegExp(`^[0-9a-f]{${numberOfChar}}$`);

    return typeof data === 'string' && dataRegex.test(data);
  }
}
