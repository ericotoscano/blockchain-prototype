import { ec as EC } from 'elliptic';

export interface IKeyCreation {
  createKeyPair(hashedData: string): EC.KeyPair;
  createPublicKey(keyPair: EC.KeyPair): string;
}

export class Secp256k1KeyCreation implements IKeyCreation {
  private curve: EC;

  constructor() {
    this.curve = new EC('secp256k1');
  }

  createKeyPair(hashedData: string): EC.KeyPair {
    return this.curve.keyFromPrivate(hashedData);
  }

  createPublicKey(keyPair: EC.KeyPair): string {
    return keyPair.getPublic('hex');
  }
}
