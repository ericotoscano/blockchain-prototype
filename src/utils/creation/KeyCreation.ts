import { ec as EC } from 'elliptic';
import { IKeyCreation } from '../../interfaces/creation/IKeyCreation';

export class KeyCreation implements IKeyCreation {
  constructor(private readonly curve: EC) {}

  createKeyPair(hashedData: string): EC.KeyPair {
    return this.curve.keyFromPrivate(hashedData);
  }

  createPublicKey(keyPair: EC.KeyPair): string {
    return keyPair.getPublic('hex');
  }
}
