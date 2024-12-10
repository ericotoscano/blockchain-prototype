import { Request, Response } from 'express';
import axios from 'axios';

import { ResponseDTO, ErrorDTO, BlockDTO, TransactionDTO } from '../types/ResponseDTO';

import { TransactionIdCreation } from '../services/transaction/creation/TransactionIdCreation';
import { BlockCreation } from '../services/block/creation/BlockCreation';
import { Sha256HashCreation } from '../utils/creation/Sha256HashCreation';
import { ITransaction } from '../types/ITransaction';
import { TransactionConversion } from '../services/transaction/conversion/TransactionConversion';
import { IBlockchain } from '../types/blockchain.types';
import { GlobalManagement } from '../services/management/GlobalManagement';
import { IBlock } from '../types/IBlock';
import { TransactionCalculation } from '../services/transaction/calculation/TransacionCalculation';
import { RewardTransactionCreation } from '../services/transaction/creation/RewardTransactionCreation';
import { BlockMining } from '../services/block/mining/BlockMining';
import { BlockConversion } from '../services/block/conversion/BlockConversion';

const mineBlock = async (req: Request<{}, {}, TransactionDTO[]>, res: Response<ResponseDTO<BlockDTO> | ErrorDTO>): Promise<void> => {
  try {
    const transactionsDTO: TransactionDTO[] = req.body;

    const creationDependencies = { hashCreation: Sha256HashCreation, transactionIdCreation: TransactionIdCreation };

    const transactions: ITransaction[] = TransactionConversion.convertAllToClass(transactionsDTO, creationDependencies);

    const blockchain: IBlockchain = GlobalManagement.getBlockchain();

    const { target }: IBlockchain = blockchain;

    const { height, hash }: IBlock = blockchain.blocksManagement.getPreviousBlock();

    const transactionDependencies = { transactionCalculation: TransactionCalculation, transactionIdCreation: TransactionIdCreation, rewardTransactionCreation: RewardTransactionCreation };

    const miningDependencies = { blockMining: BlockMining, hashCreation: Sha256HashCreation };

    const block = BlockCreation.create(height, hash, transactions, target, transactionDependencies, miningDependencies);

    blockchain.blocksManagement.addBlock(block);

    const blockDTO: BlockDTO = BlockConversion.convertToDTO(block, TransactionConversion);

    res.status(201).send({
      type: 'Mine Block',
      code: 10,
      message: 'The block has been mined.',
      data: blockDTO,
    });
  } catch (error) {
    const errorMessage: string = error instanceof Error ? error.message : 'Unexpected error.';

    res.status(500).send({
      type: 'Server Error',
      code: 50,
      message: errorMessage,
    });
  }
};

const sendNextBlock = async (req: Request<{}, {}, BlockDTO>, res: Response<ResponseDTO<BlockDTO> | ErrorDTO>): Promise<void> => {
  try {
    const nextBlock: BlockDTO = req.body;

    const updateBlockchainPromises: Promise<Response<ResponseDTO<BlockDTO> | ErrorDTO>>[] = [];

    for (const connectedNode of blockchain.node.connectedNodes) {
      const updateBlockchainPromise = axios.post<Response<ResponseDTO<BlockDTO> | ErrorDTO>>(`${connectedNode}/blockchain/blocks`, { nextBlock }).then((response) => response.data);

      updateBlockchainPromises.push(updateBlockchainPromise);
    }

    await Promise.all(updateBlockchainPromises);

    res.status(201).send({
      type: 'Send Next Block Response',
      code: 10,
      message: 'The next block has been added.',
      data: nextBlock,
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
  mineBlock,
  sendNextBlock,
};
