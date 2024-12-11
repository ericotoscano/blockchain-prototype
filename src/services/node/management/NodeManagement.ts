import { INodeManagement } from '../../../types/management.types';
import { IConnectedNode, INode } from '../../../domain/types/INode';

export class NodeManagement implements INodeManagement {
  constructor(readonly node: INode) {}

  getConnectedNodesForBroadcast(nodeUrlTarget: string): IConnectedNode[] {
    const otherNodes = this.node.connectedNodes.filter((connectedNode) => connectedNode.nodeUrl !== nodeUrlTarget);

    return [...otherNodes, this.node];
  }

  setNodeToConnect(nodeToConnect: INode): IConnectedNode {
    return { nodeUrl: nodeToConnect.nodeUrl, nodeAddress: nodeToConnect.nodeAddress };
  }

  setConnectedNodes(connectedNodes: IConnectedNode[]): void {
    this.node.connectedNodes = structuredClone(connectedNodes);
  }

  addToConnectedNodes(nodeToConnect: IConnectedNode): void {
    this.node.connectedNodes.push(nodeToConnect);
  }
}
