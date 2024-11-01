import { sha256 } from 'js-sha256';
import { ec as EC } from 'elliptic';
import * as crypto from 'crypto';

const ec = new EC('secp256k1');

export const generateNodeAddress = (port: string): string => {
  const originHash = sha256(port);

  const key = ec.keyFromPrivate(originHash);

  const publicKey = key.getPublic('hex');
  const publicKeyBuffer = Buffer.from(publicKey, 'hex');

  const hash = crypto.createHash('sha256').update(publicKeyBuffer).digest();
  const address = crypto.createHash('ripemd160').update(hash).digest('hex');

  return address;
};

export const verifyAddress = (publicKey: string, expectedAddress: string): boolean => {
  const publicKeyBuffer = Buffer.from(publicKey, 'hex');

  const hash = crypto.createHash('sha256').update(publicKeyBuffer).digest();
  const address = crypto.createHash('ripemd160').update(hash).digest('hex');

  return address === expectedAddress;
};
