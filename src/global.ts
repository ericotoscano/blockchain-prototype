import 'dotenv/config';
import { ec as EC } from 'elliptic';

import { Node } from './entities/node/Node';
import { LocalHostNodeUrlCreation } from './helpers/creation/nodes/NodeUrlCreation';
import { LocalHostNodeAddressCreation } from './helpers/creation/nodes/NodeAddressCreation';

import { Blockchain } from './entities/blockchain/Blockchain';
import { Mempool } from './helpers/management/blockchain/MempoolManagement';
import { Blocks } from './helpers/management/blockchain/BlocksManagement';
import { TargetManagement } from './helpers/management/blockchain/TargetManagement';
import { NodeManagement } from './helpers/management/nodes/NodeManagement';
import { GenesisBlockCreation } from './helpers/creation/blocks/GenesisBlockCreation';

import { BlockMining } from './helpers/mining/block/BlockMining';
import { KeyCreation } from './utils/creation/KeyCreation';
import { Sha256HashCreation, Ripemd160HashCreation } from './utils/creation/Ripmed160HashCreation';

declare global {
  var blockchain: Blockchain;
  var blockchainNode: Node;
}

const curve = new EC('secp256k1');
const secp256k1KeyCreation = new KeyCreation(curve);

const localHostNodeAddressCreation = new LocalHostNodeAddressCreation(secp256k1KeyCreation, Sha256HashCreation, Ripemd160HashCreation);

global.blockchainNode = new Node(LocalHostNodeUrlCreation, localHostNodeAddressCreation);

const mempool = new Mempool([]);
const blocks = new Blocks([]);
const nodeManagement = new NodeManagement(blockchainNode);
const blockMining = new BlockMining(Sha256HashCreation);
const genesisBlockCreation = new GenesisBlockCreation(blockMining);

global.blockchain = new Blockchain({ targetZeros: 3, reward: 3.125, maxTransactionsPerBlock: 10 }, blockchainNode, mempool, blocks, TargetManagement, nodeManagement, genesisBlockCreation);

export {};
