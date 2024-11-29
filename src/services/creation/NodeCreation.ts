import { Node } from '../../models/Node';

import { HashCreationType, KeyCreationType, NodeAddressCreationType, NodeUrlCreationType } from '../../types/creation.types';
import { IConnectedNode, INode } from '../../types/node.types';

export class NodeCreation {
  static create(
    nodeUrlCreation: NodeUrlCreationType,
    nodeAddressCreation: NodeAddressCreationType,
    keyCurveOption: string,
    keyCreation: KeyCreationType,
    mainHashCreation: HashCreationType,
    addressHashCreation: HashCreationType,
    connectedNodes?: IConnectedNode[]
  ): INode {
    const nodeUrl = nodeUrlCreation.create();

    const nodeAddress = nodeAddressCreation.create(nodeUrl, keyCurveOption, keyCreation, mainHashCreation, addressHashCreation);

    const networkNodes = connectedNodes ?? [];

    return new Node(nodeUrl, nodeAddress, networkNodes);
  }
}
