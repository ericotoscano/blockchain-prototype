import { Blockchain } from './models/Blockchain';
import { Node } from './models/Node';

declare global {
  var blockchain: Blockchain;
  var nodes: Node[];
}

global.nodes = [];

export {};
