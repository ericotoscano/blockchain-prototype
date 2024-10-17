import { Blockchain } from './models/Blockchain';
import { Nodes } from './models/Nodes';
declare global {
  var blockchain: Blockchain;
  var nodes: Nodes;
}

global.blockchain = new Blockchain();
global.nodes = new Nodes();

export {};
