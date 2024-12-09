import { IConnectedNode, INode } from "./node.types";
import { ITransaction } from "./transaction.types";

export interface INodeManagement {
  readonly node: INode;
  getConnectedNodesForBroadcast(nodeUrlTarget: string): IConnectedNode[];
  setNodeToConnect(nodeToConnect: INode): IConnectedNode;
  setConnectedNodes(connectedNodes: IConnectedNode[]): void;
  addToConnectedNodes(nodeToConnect: IConnectedNode): void;
}

export interface IBlockTransactionsManagement {
  readonly transactions: ITransaction[];
  addTransaction(transaction: ITransaction): void;
  addRewardTransaction(rewardTransaction: ITransaction): void;
}


