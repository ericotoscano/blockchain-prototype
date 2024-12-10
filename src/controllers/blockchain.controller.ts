import { Request, Response } from 'express';
import { ResponseDTO, ErrorDTO} from '../types/ResponseDTO';
import { BlockchainConversion } from '../services/blockchain/conversion/BlockchainConversion';
import { BlockConversion } from '../services/block/conversion/BlockConversion';
import { TransactionConversion } from '../services/transaction/conversion/TransactionConversion';
import { NodeConversion } from '../services/node/conversion/NodeConversion';
import { BlockchainManagement } from '../services/blockchain/management/BlockchainManagement';
import { IBlockchain } from '../types/IBlockchain';
import { CreateBlockchainDependenciesType } from '../helpers/dependencies/types/BlockchainDependenciesCreationTypes';
import { BlockchainDependenciesCreation } from '../helpers/dependencies/BlockchainDependenciesCreation';
import { BlockchainDTOInput, BlockchainDTOOutput } from '../services/blockchain/conversion/types/BlockchainDTO';


const createBlockchain = async (req: Request<{}, {}, BlockchainDTOInput>, res: Response<ResponseDTO<BlockchainDTOOutput> | ErrorDTO>): Promise<void> => {
  try {
    const BlockchainDTOInput: BlockchainDTOInput = req.body;

    const { nodeDependencies, keyDependencies, miningDependencies, transactionDependencies }: CreateBlockchainDependenciesType = BlockchainDependenciesCreation.createBlockchain();

    const blockchain: IBlockchain = BlockchainConversion.convertToClass(BlockchainDTOInput, nodeDependencies, keyDependencies, miningDependencies, transactionDependencies);

    BlockchainManagement.setBlockchain(blockchain);

    const blockchainDTOOutput: BlockchainDTOOutput = BlockchainConversion.convertToDTO(blockchain, NodeConversion, BlockConversion, TransactionConversion);

    res.status(201).send({
      type: 'Create Blockchain',
      code: 1000,
      message: 'The blockchain has been created.',
      data: blockchainDTOOutput,
    });
  } catch (error) {
    const errorMessage: string = error instanceof Error ? error.message : 'Unexpected error.';

    res.status(500).send({
      type: 'Internal Server Error',
      code: 999,
      message: errorMessage,
    });
    return;
  }
};

const getBlockchain = async (req: Request, res: Response<ResponseDTO<BlockchainDTOOutput> | ErrorDTO>): Promise<void> => {
  try {
    const blockchain: IBlockchain = BlockchainManagement.getBlockchain();

    const blockchainDTOOutput: BlockchainDTOOutput = BlockchainConversion.convertToDTO(blockchain, NodeConversion, BlockConversion, TransactionConversion);

    res.status(200).send({
      type: 'Get Blockchain',
      code: 1100,
      message: 'The blockchain has been found.',
      data: blockchainDTOOutput,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unexpected error.';

    res.status(500).send({
      type: 'Internal Server Error',
      code: 999,
      message: errorMessage,
    });
    return;
  }
};

export default {
  createBlockchain,
  getBlockchain,
};
