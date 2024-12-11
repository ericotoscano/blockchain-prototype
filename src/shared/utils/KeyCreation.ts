import { ec as EC } from 'elliptic';
export class KeyCreation {
  static createKeyPair(hashedData: string, curve: EC): EC.KeyPair {
    return curve.keyFromPrivate(hashedData);
  }

  static createPublicKey(keyPair: EC.KeyPair): string {
    return keyPair.getPublic('hex');
  }
}
