import { Request, Response } from 'express';
import { ResponseDTO, ErrorDTO, BlockDTO, AddBlockDTO } from '../../shared/types/ResponseDTO';
import { BlockDTOCreation } from '../../services/block/conversion/BlockDTOCreation';
import { BlockchainManagement } from '../services/blockchain/management/BlockchainManagement';
import { DependenciesCreation } from '../../shared/helpers/BlockDependenciesCreation';
import { AddBlockDependenciesType } from '../../shared/helpers/DependenciesTypes';

const addBlock = async (req: Request<{}, {}, BlockDTO>, res: Response<ResponseDTO<AddBlockDTO> | ErrorDTO>): Promise<void> => {
  try {
    const blockDTO: BlockDTO = req.body;

    const dependencies: AddBlockDependenciesType = DependenciesCreation.addBlock();

    BlockchainManagement.addBlock(blockDTO, transactionsDependencies, miningDependencies);

    const addBlockDTO: AddBlockDTO = BlockDTOCreation.createAddBlockDTO();

    res.status(200).send({
      type: 'Add Block',
      code: 10,
      message: 'The block has been added.',
      data: addBlockDTO,
    });
  } catch (error) {
    const errorMessage: string = error instanceof Error ? error.message : 'Unexpected error.';

    res.status(500).send({
      type: 'Internal Server Error',
      code: 99,
      message: errorMessage,
    });
    return;
  }
};

export default {
  addBlock,
};
