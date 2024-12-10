import { IConnectedNode, INode } from '../types/INode';

export class Node implements INode {
  constructor(readonly nodeUrl: string, readonly nodeAddress: string, readonly connectedNodes: IConnectedNode[]) {}
}
