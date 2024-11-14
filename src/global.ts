import 'dotenv/config';

import { Node } from './entities/node/Node';
import { LocalHostNodeUrlCreation } from './entities/node/NodeUrlCreation';
import { LocalHostNodeAddressCreation } from './entities/node/NodeAddressCreation';

import { Blockchain } from './entities/blockchain/Blockchain';
import { Mempool } from './entities/blockchain/Mempool';
import { Blocks } from './entities/blockchain/Blocks';
import { TargetManagement } from './entities/blockchain/TargetManagement';
import { GenesisBlockCreation } from './entities/blockchain/GenesisBlockCreation';

import { BlockMining } from './entities/block/BlockMining';
import { Secp256k1KeyCreation } from './entities/block/KeyCreation';
import { Sha256HashCreation, Ripemd160HashCreation } from './entities/block/HashCreation';

declare global {
  var blockchain: Blockchain;
  var blockchainNode: Node;
}

const secp256k1KeyCreation = new Secp256k1KeyCreation();

const localHostNodeAddressCreation = new LocalHostNodeAddressCreation(secp256k1KeyCreation, Sha256HashCreation, Ripemd160HashCreation);

global.blockchainNode = new Node(LocalHostNodeUrlCreation, localHostNodeAddressCreation);

const mempool = new Mempool([]);
const blocks = new Blocks([]);
const blockMining = new BlockMining(Sha256HashCreation);
const genesisBlockCreation = new GenesisBlockCreation(blockMining);

global.blockchain = new Blockchain({ targetZeros: 3, reward: 3.125, maxTransactionsPerBlock: 10 }, blockchainNode, mempool, blocks, TargetManagement, genesisBlockCreation);

export {};
