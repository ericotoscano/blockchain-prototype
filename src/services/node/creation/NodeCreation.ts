import { Node } from '../../../models/Node';
import { KeyDependenciesType, NodeDependenciesType } from '../../../types/dependencies.types';
import { IConnectedNode, INode } from '../../../types/node.types';

export class NodeCreation {
  static create(keyDependencies: KeyDependenciesType, nodeDependencies: NodeDependenciesType, connectedNodes?: IConnectedNode[]): INode {
    const { nodeAddressCreation, nodeUrlCreation } = nodeDependencies;

    const nodeUrl = nodeUrlCreation.create();

    const nodeAddress = nodeAddressCreation.create(nodeUrl, keyDependencies);

    const networkNodes = connectedNodes ?? [];

    return new Node(nodeUrl, nodeAddress, networkNodes);
  }
}
