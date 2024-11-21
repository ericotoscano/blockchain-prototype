import 'dotenv/config';

import { Node } from './entities/node/Node';
import { LocalHostNodeUrlCreation } from './helpers/creation/nodes/NodeUrlCreation';
import { LocalHostNodeAddressCreation } from './helpers/creation/nodes/NodeAddressCreation';

import { Blockchain } from './entities/blockchain/Blockchain';
import { Mempool } from './entities/blockchain/Mempool';
import { Blocks } from './entities/blockchain/Blocks';
import { TargetManagement } from './helpers/management/blockchain/TargetManagement';
import { NodeManagement } from './helpers/management/nodes/NodeManagement';
import { GenesisBlockCreation } from './helpers/creation/blocks/GenesisBlockCreation';

import { BlockMining } from './helpers/mining/blocks/BlockMining';
import { Secp256k1KeyCreation } from './utils/creation/KeyCreation';
import { Sha256HashCreation, Ripemd160HashCreation } from './utils/creation/HashCreation';

declare global {
  var blockchain: Blockchain;
  var blockchainNode: Node;
}

const secp256k1KeyCreation = new Secp256k1KeyCreation();

const localHostNodeAddressCreation = new LocalHostNodeAddressCreation(secp256k1KeyCreation, Sha256HashCreation, Ripemd160HashCreation);

global.blockchainNode = new Node(LocalHostNodeUrlCreation, localHostNodeAddressCreation);

const mempool = new Mempool([]);
const blocks = new Blocks([]);
const nodeManagement = new NodeManagement(blockchainNode);
const blockMining = new BlockMining(Sha256HashCreation);
const genesisBlockCreation = new GenesisBlockCreation(blockMining);

global.blockchain = new Blockchain({ targetZeros: 3, reward: 3.125, maxTransactionsPerBlock: 10 }, blockchainNode, mempool, blocks, TargetManagement, nodeManagement, genesisBlockCreation);

export {};
