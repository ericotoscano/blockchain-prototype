export class DTOValidation {
  static validateKeys(dto: Record<string, any>, requiredKeys: string[]): boolean {
    const dtoKeys = Object.keys(dto);

    const hasNoExtraKeys: boolean = dtoKeys.length === requiredKeys.length;

    const hasAllRequiredKeys: boolean = requiredKeys.every((key) => key in dto);

    return hasAllRequiredKeys && hasNoExtraKeys;
  }
}
