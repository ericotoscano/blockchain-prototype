import { AddBlockDTO } from '../../types/dto.types';

export class BlockDTOCreation {
  static createAddBlockDTO(chainLength: number): AddBlockDTO {
    return { chainLength };
  }
}
