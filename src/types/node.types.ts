import { INodeAddressCreation, NodeUrlCreationType } from "./creation.types";

export interface INode {
  readonly nodeUrl: string;
  readonly nodeAddress: string;
  connectedNodes: IConnectedNodes[];
  readonly nodeUrlCreation: NodeUrlCreationType;
  readonly nodeAddressCreation: INodeAddressCreation;
  setConnectedNodes(connectedNodes: IConnectedNodes[]): void;
}

export interface IConnectedNodes {
  nodeUrl: string;
  nodeAddress: string;
}
