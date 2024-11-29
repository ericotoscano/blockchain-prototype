export interface INode {
  readonly nodeUrl: string;
  readonly nodeAddress: string;
  connectedNodes: IConnectedNode[];
}

export interface IConnectedNode {
  readonly nodeUrl: string;
  readonly nodeAddress: string;
}
