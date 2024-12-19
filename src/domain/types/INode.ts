import INodeAddress from "../value-objects/INodeAddress";
import INodeUrl from "../value-objects/INodeUrl";

export interface INode {
  readonly nodeUrl: INodeUrl;
  readonly nodeAddress: INodeAddress;
  getConnectedNodes(): IConnectedNode[];
  setConnectedNodes(newConnectedNodes: IConnectedNode[]): void;
}

export interface IConnectedNode {
  readonly nodeUrl: INodeUrl;
  readonly nodeAddress: INodeAddress;
}
