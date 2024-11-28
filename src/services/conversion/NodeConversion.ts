import { INode } from '../../types/node.types';
import { NodeDTO } from '../../types/dto.types';

export class NodeConversion {
  static convertToDTO(node: INode): NodeDTO {
    return { nodeUrl: node.nodeUrl, nodeAddress: node.nodeAddress, connectedNodes: node.connectedNodes };
  }
}
