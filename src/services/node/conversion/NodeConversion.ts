import { INode } from '../../../domain/types/INode';
import { NodeDTO } from '../../../shared/types/ResponseDTO';

export class NodeConversion {
  static convertToDTO(node: INode): NodeDTO {
    return { nodeUrl: node.nodeUrl, nodeAddress: node.nodeAddress, connectedNodes: node.connectedNodes.sort() };
  }
}
