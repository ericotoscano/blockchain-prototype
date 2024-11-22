export type AddressVerificationType = {
  verify(publicKey: string, expectedAddress: string): boolean;
};
