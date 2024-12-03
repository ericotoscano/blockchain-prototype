import { Request, Response } from 'express';
import axios from 'axios';

import { IBlock } from '../types/block.types';
import { BlockDTO, ResponseDTO, ErrorDTO } from '../types/dto.types';

import { BlockMining } from '../services/mining/BlockMining';

import { TransactionIdCreation } from '../services/creation/TransactionIdCreation';
import { BlockCreation } from '../services/creation/BlockCreation';
import { Sha256HashCreation } from '../utils/creation/Sha256HashCreation';
//COMEÇAR DAQUI!!!! VALIDAR essa funcao para liberar a rota /blocks post (seguir padrao do createBlockchain)
const addNextBlock = async (req: Request<{}, {}, BlockDTO>, res: Response<ResponseDTO<BlockDTO> | ErrorDTO>): Promise<void> => {
  try {
    const nextBlock: BlockDTO = req.body;

    const transactionDataConversion = new TransactionDataConversion(Sha256HashCreation, TransactionIdCreation);

    const block: IBlock = BlockDataConversion.convert(nextBlock, transactionDataConversion);

    global.blockchain.blocksManagement.addBlock(block);

    res.status(200).send({
      type: 'Add Next Block Response',
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
  addNextBlock,
  mineNextBlock,
  sendNextBlock,
};
