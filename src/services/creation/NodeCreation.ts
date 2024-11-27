import { HashCreationType, KeyCreationType, NodeAddressCreationType, NodeUrlCreationType } from '../../types/creation.types';
import { Node } from '../../models/Node';
import { INode } from '../../types/node.types';

export class NodeCreation {
  static create(
    nodeUrlCreation: NodeUrlCreationType,
    nodeAddressCreation: NodeAddressCreationType,
    keyCurveOption: string,
    keyCreation: KeyCreationType,
    mainHashCreation: HashCreationType,
    addressHashCreation: HashCreationType
  ): INode {
    const nodeUrl = nodeUrlCreation.create();

    const nodeAddress = nodeAddressCreation.create(nodeUrl, keyCurveOption, keyCreation, mainHashCreation, addressHashCreation);

    return new Node(nodeUrl, nodeAddress);
  }
}
