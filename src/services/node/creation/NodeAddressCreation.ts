import { ec as EC } from 'elliptic';
import { KeyDependenciesType } from '../../../helpers/dependencies/types/DependenciesTypes';

export class LocalHostNodeAddressCreation {
  static create(data: string, keyDependencies: KeyDependenciesType): string {
    const { keyCurveOption, keyCreation, mainHashCreation, secondHashCreation } = keyDependencies;

    const curve = new EC(keyCurveOption);

    const hashedData = mainHashCreation.hash(data);

    const keyPair = keyCreation.createKeyPair(hashedData, curve);

    const publicKey = keyCreation.createPublicKey(keyPair);

    const publicKeyFirstHash = mainHashCreation.hash(publicKey);

    return secondHashCreation.hash(publicKeyFirstHash);
  }
}
