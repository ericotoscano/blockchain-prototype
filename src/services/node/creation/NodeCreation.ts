import { Node } from '../../../domain/entities/Node';
import { KeyDependenciesType, NodeDependenciesType } from '../../../helpers/dependencies/types/DependenciesTypes';
import { IConnectedNode, INode } from '../../../domain/types/INode';

export class NodeCreation {
  static create(keyDependencies: KeyDependenciesType, nodeDependencies: NodeDependenciesType, connectedNodes?: IConnectedNode[]): INode {
    const { nodeAddressCreation, nodeUrlCreation } = nodeDependencies;

    const nodeUrl = nodeUrlCreation.create();

    const nodeAddress = nodeAddressCreation.create(nodeUrl, keyDependencies);

    const networkNodes = connectedNodes ?? [];

    return new Node(nodeUrl, nodeAddress, networkNodes);
  }
}
