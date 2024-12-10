import { AddBlockDTOOutput } from './types/BlockDTOCreationType';

export class BlockDTOCreation {
  static createAddBlockDTOOutput(): AddBlockDTOOutput {
    return { blockHeight: global.blockchain.blocksManagement.getChainLength() };
  }
}
