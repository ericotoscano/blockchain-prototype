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

const createBlockchain = async (req: Request<{}, {}, CreateBlockchainDTO>, res: Response<ResponseDTO<BlockchainDTO> | ErrorDTO>): Promise<void> => {
  try {
    const blockchain = BlockchainConversion.convertToClass(
      req.body,
      TargetManagement,
      BlockMining,
      BlockCreation,
      LocalHostNodeUrlCreation,
      LocalHostNodeAddressCreation,
      'secp256k1',
      KeyCreation,
      Sha256HashCreation,
      Ripemd160HashCreation
    );

    GlobalManagement.setBlockchain(blockchain);

    const blockchainDTO = BlockchainConversion.convertToDTO(blockchain, BlockConversion, TransactionConversion, NodeConversion);

    res.status(201).send({
      type: 'Create Blockchain',
      code: 10,
      message: 'The blockchain has been created.',
      data: blockchainDTO,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unexpected error.';

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
    const blockchain = GlobalManagement.getBlockchain();

    const blockchainDTO = BlockchainConversion.convertToDTO(blockchain, BlockConversion, TransactionConversion, NodeConversion);

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
