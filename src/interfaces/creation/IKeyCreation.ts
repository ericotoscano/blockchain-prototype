import { ec as EC } from 'elliptic';

export interface IKeyCreation {
  createKeyPair(hashedData: string): EC.KeyPair;
  createPublicKey(keyPair: EC.KeyPair): string;
}
