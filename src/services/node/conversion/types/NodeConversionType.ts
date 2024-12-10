import { INode } from '../../../../types/INode';
import { NodeDTO } from '../../../../types/ResponseDTO';

export type NodeConversionType = {
  convertToDTO(node: INode): NodeDTO;
};
