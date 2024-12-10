export interface INode {
  readonly nodeUrl: string;
  readonly nodeAddress: string;
  getConnectedNodes(): IConnectedNode[];
  setConnectedNodes(newConnectedNodes: IConnectedNode[]): void;
}

export interface IConnectedNode {
  readonly nodeUrl: string;
  readonly nodeAddress: string;
}
