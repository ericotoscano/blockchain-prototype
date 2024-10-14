import { NodeType } from '../types/node.types';
export class Node implements NodeType {
  currentNodeUrl: string;
  networkNodes: string[];

  constructor(currentNodeUrl: string) {
    this.currentNodeUrl = currentNodeUrl;
    this.networkNodes = [];
  }
}
