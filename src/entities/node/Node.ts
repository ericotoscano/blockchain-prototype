import { INodeUrlCreation } from './NodeUrlCreation';
import { INodeAddressCreation } from './NodeAddressCreation';

export interface IConnectedNodes {
  nodeUrl: string;
  nodeAddress: string;
}

export interface INode {
  readonly nodeUrl: string;
  readonly nodeAddress: string;
  connectedNodes: IConnectedNodes[];
  readonly nodeUrlCreation: INodeUrlCreation;
  readonly nodeAddressCreation: INodeAddressCreation;
  setConnectedNodes(connectedNodes: IConnectedNodes[]): void;
}

export class Node implements INode {
  readonly nodeUrl: string;
  readonly nodeAddress: string;
  connectedNodes: IConnectedNodes[];

  constructor(readonly nodeUrlCreation: INodeUrlCreation, readonly nodeAddressCreation: INodeAddressCreation, connectedNodes?: IConnectedNodes[]) {
    this.nodeUrl = this.nodeUrlCreation.create();
    this.nodeAddress = this.nodeAddressCreation.create(this.nodeUrl);
    this.connectedNodes = connectedNodes ?? [];
  }

  setConnectedNodes(connectedNodes: IConnectedNodes[]): void {
    this.connectedNodes = structuredClone(connectedNodes);
  }
}
