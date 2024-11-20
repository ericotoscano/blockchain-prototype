import { NodeUrlCreationType, INodeAddressCreation, IConnectedNodes, INode } from '../../types/node.types';

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
