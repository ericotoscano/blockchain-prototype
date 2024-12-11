import { ec as EC } from 'elliptic';

export type KeyCreationType = {
  createKeyPair(hashedData: string, curve: EC): EC.KeyPair;
  createPublicKey(keyPair: EC.KeyPair): string;
};
