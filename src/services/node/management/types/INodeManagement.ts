import { INode, IConnectedNode } from '../../../../types/INode';

export interface INodeManagement {
  readonly node: INode;
  getConnectedNodesForBroadcast(nodeUrlTarget: string): IConnectedNode[];
  setNodeToConnect(nodeToConnect: INode): IConnectedNode;
  setConnectedNodes(connectedNodes: IConnectedNode[]): void;
  addToConnectedNodes(nodeToConnect: IConnectedNode): void;
}
