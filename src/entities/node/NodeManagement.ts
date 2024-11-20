import { IConnectedNodes, INode } from '../../types/node.types';

export interface INodeManagement {
  addToConnectedNodes(nodeUrl: string, nodeAddress: string): void;
  getConnectedNodesForBroadcast(nodeUrlTarget: string): IConnectedNodes[];
  SortConnectedNodes(): void;
}

export class NodeManagement implements INodeManagement {
  constructor(private readonly node: INode) {}

  addToConnectedNodes(nodeUrl: string, nodeAddress: string): void {
    this.node.connectedNodes.push({ nodeUrl, nodeAddress });
  }

  getConnectedNodesForBroadcast(nodeUrlTarget: string): IConnectedNodes[] {
    const otherNodes = this.node.connectedNodes.filter((connectedNode) => connectedNode.nodeUrl !== nodeUrlTarget);

    return [...otherNodes, this.node];
  }

  SortConnectedNodes(): void {
    this.node.connectedNodes.sort();
  }
}
