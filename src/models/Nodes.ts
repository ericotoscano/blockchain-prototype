import { NodesType } from '../types/nodes.types';
export class Nodes implements NodesType {
  currentNodeUrl: string;
  networkNodes: string[];

  constructor() {
    this.currentNodeUrl = (process.env.BASE_URL || 'http://localhost:') + process.argv[2];
    this.networkNodes = [];
  }

  addNode(nodeUrl: string): void {
    this.networkNodes.push(nodeUrl);
  }

  broadcastNodesTo(nodeUrl: string): string[] {
    const otherNodes = this.networkNodes.filter((node) => node !== nodeUrl);
    const nodesToBroadcast = [...otherNodes, this.currentNodeUrl];

    return nodesToBroadcast;
  }
}
