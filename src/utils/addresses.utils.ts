
import * as Bitcore from 'bitcore-lib';

export const generateAddress = (): string => {
  const privateKey = new Bitcore.PrivateKey();

  const address = privateKey.toAddress();

  return address.toString();
};

const bitcoinAddress = generateAddress();
console.log('Endereço Bitcoin:', bitcoinAddress);

