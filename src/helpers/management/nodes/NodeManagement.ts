import { INodeManagement } from '../../../interfaces/management/INodeManagement';
import { IConnectedNodes } from '../../../interfaces/nodes/IConnectedNodes';
import { INode } from '../../../interfaces/nodes/INode';

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
