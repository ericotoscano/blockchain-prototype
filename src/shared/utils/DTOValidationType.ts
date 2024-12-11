export type DTOValidationType = {
  validateKeys(dto: Record<string, any>, requiredKeys: string[]): boolean;
};
