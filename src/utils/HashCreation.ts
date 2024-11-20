import * as crypto from 'crypto';

export class Sha256HashCreation {
  static hash(data: string): string {
    return crypto.createHash('sha256').update(data).digest('hex');
  }
}

export class Ripemd160HashCreation {
  static hash(data: string): string {
    return crypto.createHash('ripemd160').update(data).digest('hex');
  }
}
