export type NodeUrlCreationType = {
  create(): string;
};

export type NodeInputType = {
  nodeUrl: string;
};

export type ConnectedNodesInputType = {
  connectedNodes: string[];
};

export interface INodeAddressCreation {
  create(data: string): string;
}

export interface IConnectedNodes {
  nodeUrl: string;
  nodeAddress: string;
}

export interface INode {
  readonly nodeUrl: string;
  readonly nodeAddress: string;
  connectedNodes: IConnectedNodes[];
  readonly nodeUrlCreation: NodeUrlCreationType;
  readonly nodeAddressCreation: INodeAddressCreation;
  setConnectedNodes(connectedNodes: IConnectedNodes[]): void;
}
