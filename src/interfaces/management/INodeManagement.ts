import { IConnectedNodes } from '../nodes/IConnectedNodes';

export interface INodeManagement {
  addToConnectedNodes(nodeUrl: string, nodeAddress: string): void;
  getConnectedNodesForBroadcast(nodeUrlTarget: string): IConnectedNodes[];
  SortConnectedNodes(): void;
}
