import { INode } from '../../../types/INode';
import { NodeDTO } from '../../../types/ResponseDTO';

export class NodeConversion {
  static convertToDTO(node: INode): NodeDTO {
    return { nodeUrl: node.nodeUrl, nodeAddress: node.nodeAddress, connectedNodes: node.connectedNodes.sort() };
  }
}
