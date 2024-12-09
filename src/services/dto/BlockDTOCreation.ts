import { AddBlockDTO } from '../../types/dto.types';

export class BlockDTOCreation {
  static createAddBlockDTO(): AddBlockDTO {
    return { blockHeight: global.blockchain.blocksManagement.getChainLength() };
  }
}
