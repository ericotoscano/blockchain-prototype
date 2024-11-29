export type DateFormatValidationType = {
  validate(data: Date): boolean;
};

export type HexStringFormatValidationType = {
  validate(data: string, numberOfChar: number): boolean;
};

export type AddressVerificationType = {
  verify(publicKey: string, expectedAddress: string): boolean;
};

export type DTOValidationType = {
  validateKeys(dto: Record<string, any>, requiredKeys: string[]): boolean;
};
