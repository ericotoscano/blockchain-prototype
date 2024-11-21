import { ec as EC } from 'elliptic';
import { IKeyCreation } from '../../types/crypto.types';

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
