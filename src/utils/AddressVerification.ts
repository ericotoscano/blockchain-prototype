import * as crypto from 'crypto';

export type AddressVerificationType = {
  verify(publicKey: string, expectedAddress: string): boolean;
};

export class AddressVerification {
  static verify(publicKey: string, expectedAddress: string): boolean {
    const hash = crypto.createHash('sha256').update(publicKey).digest('hex');
    const address = crypto.createHash('ripemd160').update(hash).digest('hex');

    return address === expectedAddress;
  }
}
