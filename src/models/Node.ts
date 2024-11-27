import { IConnectedNodes, INode } from '../types/node.types';

export class Node implements INode {
  connectedNodes: IConnectedNodes[];

  constructor(readonly nodeUrl: string, readonly nodeAddress: string, connectedNodes?: IConnectedNodes[]) {
    this.connectedNodes = connectedNodes ?? [];
  }

  setConnectedNodes(connectedNodes: IConnectedNodes[]): void {
    this.connectedNodes = structuredClone(connectedNodes);
  }
}
