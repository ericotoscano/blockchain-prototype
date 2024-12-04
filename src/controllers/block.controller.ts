import { Request, Response } from 'express';
import axios from 'axios';

import { IBlock } from '../types/block.types';
import { ResponseDTO, ErrorDTO, BlockDTO, AddBlockDTO } from '../types/dto.types';

import { BlockMining } from '../services/mining/BlockMining';

import { TransactionIdCreation } from '../services/creation/TransactionIdCreation';
import { BlockCreation } from '../services/creation/BlockCreation';
import { Sha256HashCreation } from '../utils/creation/Sha256HashCreation';
import { BlockConversion } from '../services/conversion/BlockConversion';
import { TransactionConversion } from '../services/conversion/TransactionConversion';
import { TransactionCalculation } from '../services/calculation/TransacionCalculation';
import { RewardTransactionCreation } from '../services/creation/RewardTransactionCreation';
import { GlobalManagement } from '../services/management/GlobalManagement';
import { IBlockchain } from '../types/blockchain.types';
import { BlockDTOCreation } from '../services/creation/BlockDTOCreation';

const addBlock = async (req: Request<{}, {}, BlockDTO>, res: Response<ResponseDTO<AddBlockDTO> | ErrorDTO>): Promise<void> => {
  try {
    const blockDTO: BlockDTO = req.body;

    const block: IBlock = BlockConversion.convertToClass(blockDTO, TransactionConversion, TransactionCalculation, TransactionIdCreation, RewardTransactionCreation, BlockMining, Sha256HashCreation);

    const blockchain: IBlockchain = GlobalManagement.getBlockchain();

    blockchain.blocksManagement.addBlock(block);

    const chainLength: number = blockchain.blocksManagement.getChainLength();

    const addBlockDTO: AddBlockDTO = BlockDTOCreation.createAddBlockDTO(chainLength);

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

const mineNextBlock = async (req: Request<{}, {}, MineBlockDTO>, res: Response<ResponseDTO<BlockDTO> | ErrorDTO>): Promise<void> => {
  try {
    const { selectedTransactions }: MineBlockDTO = req.body;

    const transactionDataConversion = new TransactionDataConversion(Sha256HashCreation, TransactionIdCreation);

    const transactions = transactionDataConversion.convertAll(selectedTransactions);

    const input = { height: global.blockchain.blocks.length, previousHash: global.blockchain.blocksManagement.getPreviousBlock().hash, transactions };

    const nextBlock = BlockCreation.create(input, global.blockchain.target, BlockMining, Sha256HashCreation);

    global.blockchain.blocksManagement.addBlock(nextBlock);

    res.status(201).send({
      type: 'Mine Next Block Response',
      code: 10,
      message: 'The next block has been created and is ready to be sent for validation by other nodes.',
      data: nextBlock,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unexpected error.';

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
  addBlock,
  mineNextBlock,
  sendNextBlock,
};
