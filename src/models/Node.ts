import { NodeType } from '../types/node.types';
export class Node implements NodeType {
  currentNodeUrl: string;
  connectedNodes: string[];

  constructor(currentNodeUrl: string) {
    this.currentNodeUrl = currentNodeUrl;
    this.connectedNodes = [];
  }
}
