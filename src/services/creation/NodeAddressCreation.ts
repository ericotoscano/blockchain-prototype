import { HashCreationType, IKeyCreation, INodeAddressCreation } from '../../types/creation.types';

export class LocalHostNodeAddressCreation implements INodeAddressCreation {
  constructor(private readonly secp256k1KeyCreation: IKeyCreation, private readonly sha256HashCreation: HashCreationType, private readonly ripemd160HashCreation: HashCreationType) {}

  create(data: string): string {
    const hashedData = this.sha256HashCreation.hash(data);

    const keyPair = this.secp256k1KeyCreation.createKeyPair(hashedData);

    const publicKey = this.secp256k1KeyCreation.createPublicKey(keyPair);

    const publicKeyFirstHash = this.sha256HashCreation.hash(publicKey);

    return this.ripemd160HashCreation.hash(publicKeyFirstHash);
  }
}
