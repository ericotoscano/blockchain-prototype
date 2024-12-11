import { INode } from '../../../../domain/types/INode';
import { NodeDTO } from '../../../../shared/types/ResponseDTO';

export type NodeConversionType = {
  convertToDTO(node: INode): NodeDTO;
};
