import 'dotenv/config';
import { ec as EC } from 'elliptic';

import { LocalHostNodeUrlCreation } from './services/creation/NodeUrlCreation';
import { LocalHostNodeAddressCreation } from './services/creation/NodeAddressCreation';
import { TargetManagement } from './services/management/TargetManagement';
import { KeyCreation } from './utils/creation/KeyCreation';
import { Ripemd160HashCreation } from './utils/creation/Ripmed160HashCreation';
import { Sha256HashCreation } from './utils/creation/Sha256HashCreation';
import { BlockchainCreation } from './services/creation/BlockchainCreation';
import { BlockCreation } from './services/creation/BlockCreation';
import { BlockMining } from './services/mining/BlockMining';
import { IBlockchain } from './types/blockchain.types';
import { INode } from './types/node.types';

declare global {
  var blockchain: IBlockchain;
  var blockchainNode: INode;
}
//fazer um creation para node
const curve = new EC('secp256k1');
const secp256k1KeyCreation = new KeyCreation(curve);

const localHostNodeAddressCreation = new LocalHostNodeAddressCreation(secp256k1KeyCreation, Sha256HashCreation, Ripemd160HashCreation);

global.blockchainNode = new Node(LocalHostNodeUrlCreation, localHostNodeAddressCreation);

global.blockchain = BlockchainCreation.create({ targetZeros: 3, reward: 3.125, maxTransactionsPerBlock: 10 }, global.blockchainNode, TargetManagement, Sha256HashCreation, BlockMining, BlockCreation);

export {};
