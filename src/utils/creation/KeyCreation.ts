import { ec as EC } from 'elliptic';
import { IKeyCreation } from '../../types/creation.types';

export class KeyCreation implements IKeyCreation {
  constructor(private readonly curve: EC) {}

  createKeyPair(hashedData: string): EC.KeyPair {
    return this.curve.keyFromPrivate(hashedData);
  }

  createPublicKey(keyPair: EC.KeyPair): string {
    return keyPair.getPublic('hex');
  }
}
