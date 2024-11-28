export interface INode {
  readonly nodeUrl: string;
  readonly nodeAddress: string;
  connectedNodes: IConnectedNode[];
  setConnectedNodes(connectedNodes: IConnectedNode[]): void;
}

export interface IConnectedNode {
  readonly nodeUrl: string;
  readonly nodeAddress: string;
}
