import { ec as EC } from 'elliptic';
import { HashCreationType, KeyCreationType } from '../../types/creation.types';

export class LocalHostNodeAddressCreation {
  static create(data: string, keyCurveOption: string, keyCreation: KeyCreationType, mainHashCreation: HashCreationType, finalHashCreation: HashCreationType): string {
    const hashedData = mainHashCreation.hash(data);

    const curve = new EC(keyCurveOption);

    const keyPair = keyCreation.createKeyPair(hashedData, curve);

    const publicKey = keyCreation.createPublicKey(keyPair);

    const publicKeyFirstHash = mainHashCreation.hash(publicKey);

    return finalHashCreation.hash(publicKeyFirstHash);
  }
}
