import { Request, Response } from 'express';
import axios from 'axios';
import { ResponseDTO, ErrorDTO } from '../types/ResponseDTO';
import { ITransaction } from '../types/ITransaction';
import { IBlock } from '../types/IBlock';
import { BlockConversion } from '../services/block/conversion/BlockConversion';
import { BlockDTO } from '../services/block/conversion/types/BlockDTO';
import { TransactionDTO } from '../services/transaction/conversion/types/TransactionDTO';
import { MineBlockDependenciesType } from '../helpers/dependencies/types/MiningDependenciesCreationType';
import { MiningDependenciesCreation } from '../helpers/dependencies/MiningDependenciesCreation';
import { BlockchainManagement } from '../services/blockchain/management/BlockchainManagement';
import { BlockDependenciesType, MiningDependenciesType, TransactionDependenciesType } from '../helpers/dependencies/types/DependenciesTypes';

const mineBlock = async (req: Request<{}, {}, TransactionDTO[]>, res: Response<ResponseDTO<BlockDTO> | ErrorDTO>): Promise<void> => {
  try {
    const transactionsDTO: TransactionDTO[] = req.body;

    const { blockHeight, previousBlockHash, target, blockDependencies, miningDependencies, transactionsDependencies }: MineBlockDependenciesType = MiningDependenciesCreation.mineBlock();

    const { blockCreation }: BlockDependenciesType = blockDependencies;
    const { hashCreation }: Omit<MiningDependenciesType, 'targetManagement'> = miningDependencies;
    const { transactionConversion, transactionCalculation, transactionIdCreation, rewardTransactionCreation }: Omit<TransactionDependenciesType, 'transactionCreation'> = transactionsDependencies;

    const transactions: ITransaction[] = transactionConversion.convertAllToClass(transactionsDTO, transactionIdCreation, hashCreation);

    const block: IBlock = blockCreation.create(blockHeight, previousBlockHash, target, transactions, { transactionCalculation, transactionIdCreation, rewardTransactionCreation }, miningDependencies);
    //COMECAR DAQUI!!!!!
    //TALVEZ FAÇA SENTIDO JUNTAR ESSES DOIS CREATE E ADDBLOCK EM UMA COISA SO
    BlockchainManagement.addBlock(block);

    const blockDTO: BlockDTO = BlockConversion.convertToDTO(block, transactionConversion);

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
