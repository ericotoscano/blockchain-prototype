import { INode } from '../interfaces/nodes/INode';
import { IConnectedNodes } from '../interfaces/nodes/IConnectedNodes';
import { INodeAddressCreation } from '../interfaces/creation/INodeAddressCreation';

import { NodeUrlCreationType } from '../types/creation/NodeUrlCreationType';

export class Node implements INode {
  readonly nodeUrl: string;
  readonly nodeAddress: string;
  connectedNodes: IConnectedNodes[];

  constructor(readonly nodeUrlCreation: NodeUrlCreationType, readonly nodeAddressCreation: INodeAddressCreation, connectedNodes?: IConnectedNodes[]) {
    this.nodeUrl = this.nodeUrlCreation.create();
    this.nodeAddress = this.nodeAddressCreation.create(this.nodeUrl);
    this.connectedNodes = connectedNodes ?? [];
  }

  setConnectedNodes(connectedNodes: IConnectedNodes[]): void {
    this.connectedNodes = structuredClone(connectedNodes);
  }
}
