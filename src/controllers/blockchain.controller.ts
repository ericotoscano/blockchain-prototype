import { Request, Response } from 'express';

import { ResponseDTO, ErrorDTO, BlockchainDTO, CreateBlockchainDTO } from '../types/dto.types';

import { BlockMining } from '../services/mining/BlockMining';

import { GlobalManagement } from '../services/management/GlobalManagement';
import { TargetManagement } from '../services/management/TargetManagement';

import { BlockchainConversion } from '../services/conversion/BlockchainConversion';
import { BlockConversion } from '../services/conversion/BlockConversion';
import { TransactionConversion } from '../services/conversion/TransactionConversion';
import { NodeConversion } from '../services/conversion/NodeConversion';

import { BlockCreation } from '../services/creation/BlockCreation';
import { LocalHostNodeUrlCreation } from '../services/creation/NodeUrlCreation';
import { LocalHostNodeAddressCreation } from '../services/creation/NodeAddressCreation';
import { KeyCreation } from '../utils/creation/KeyCreation';
import { Ripemd160HashCreation } from '../utils/creation/Ripmed160HashCreation';
import { Sha256HashCreation } from '../utils/creation/Sha256HashCreation';
import { IBlockchain } from '../types/blockchain.types';
import { TransactionCalculation } from '../services/calculation/TransacionCalculation';
import { TransactionIdCreation } from '../services/creation/TransactionIdCreation';
import { RewardTransactionCreation } from '../services/creation/RewardTransactionCreation';
import { DependenciesCreation } from '../services/creation/DependenciesCreation';
import { CreateBlockchainDependenciesType } from '../types/dependencies.types';

const createBlockchain = async (req: Request<{}, {}, CreateBlockchainDTO>, res: Response<ResponseDTO<BlockchainDTO> | ErrorDTO>): Promise<void> => {
  try {
    const createBlockchainDTO: CreateBlockchainDTO = req.body;

    const dependencies: CreateBlockchainDependenciesType = DependenciesCreation.createBlockchain();

    const blockchain: IBlockchain = BlockchainConversion.convertToClass(createBlockchainDTO, dependencies);

    GlobalManagement.setBlockchain(blockchain);

    const blockchainDTO: BlockchainDTO = BlockchainConversion.convertToDTO(blockchain, BlockConversion, TransactionConversion, NodeConversion);

    res.status(201).send({
      type: 'Create Blockchain',
      code: 10,
      message: 'The blockchain has been created.',
      data: blockchainDTO,
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

const getBlockchain = async (req: Request, res: Response<ResponseDTO<BlockchainDTO> | ErrorDTO>): Promise<void> => {
  try {
    const blockchain: IBlockchain = GlobalManagement.getBlockchain();

    const blockchainDTO: BlockchainDTO = BlockchainConversion.convertToDTO(blockchain, BlockConversion, TransactionConversion, NodeConversion);

    res.status(200).send({
      type: 'Get Blockchain',
      code: 11,
      message: 'The blockchain has been found.',
      data: blockchainDTO,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unexpected error.';

    res.status(500).send({
      type: 'Server Error',
      code: 50,
      message: errorMessage,
    });
    return;
  }
};

export default {
  createBlockchain,
  getBlockchain,
};
