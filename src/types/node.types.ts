export interface INode {
  readonly nodeUrl: string;
  readonly nodeAddress: string;
  connectedNodes: IConnectedNodes[];
  setConnectedNodes(connectedNodes: IConnectedNodes[]): void;
}

export interface IConnectedNodes {
  nodeUrl: string;
  nodeAddress: string;
}
