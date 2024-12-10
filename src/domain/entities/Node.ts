import { IConnectedNode, INode } from '../../types/INode';

export class Node implements INode {
  private connectedNodes: IConnectedNode[] = [];

  constructor(readonly nodeUrl: string, readonly nodeAddress: string) {}

  getConnectedNodes(): IConnectedNode[] {
    return this.connectedNodes;
  }

  setConnectedNodes(newConnectedNodes: IConnectedNode[]): void {
    this.connectedNodes = newConnectedNodes;
  }
}
