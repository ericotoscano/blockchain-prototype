import { ec as EC } from 'elliptic';

export type HashCreationType = {
  hash(data: string): string;
};

export interface IKeyCreation {
  createKeyPair(hashedData: string): EC.KeyPair;
  createPublicKey(keyPair: EC.KeyPair): string;
}
