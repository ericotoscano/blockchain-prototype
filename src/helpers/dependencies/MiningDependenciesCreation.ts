import { BlockCreation } from '../../services/block/creation/BlockCreation';
import { BlockMining } from '../../services/block/mining/BlockMining';
import { BlockchainManagement } from '../../services/blockchain/management/BlockchainManagement';
import { TransactionCalculation } from '../../services/transaction/calculation/TransacionCalculation';
import { TransactionConversion } from '../../services/transaction/conversion/TransactionConversion';
import { RewardTransactionCreation } from '../../services/transaction/creation/RewardTransactionCreation';
import { TransactionIdCreation } from '../../services/transaction/creation/TransactionIdCreation';
import { IBlock } from '../../types/IBlock';
import { IBlockchain } from '../../types/IBlockchain';
import { Sha256HashCreation } from '../../utils/creation/Sha256HashCreation';
import { MineBlockDependenciesType } from './types/MiningDependenciesCreationType';

export class MiningDependenciesCreation {
  static mineBlock(): MineBlockDependenciesType {
    const blockchain: IBlockchain = BlockchainManagement.getBlockchain();

    const target: string = BlockchainManagement.getTarget();

    const blockHeight: number = blockchain.blocksManagement.getChainLength();

    const { hash }: IBlock = blockchain.blocksManagement.getPreviousBlock();

    return {
      blockHeight,
      previousBlockHash: hash,
      target,
      blockDependencies: { blockCreation: BlockCreation },
      miningDependencies: { blockMining: BlockMining, hashCreation: Sha256HashCreation },
      transactionsDependencies: {
        transactionCalculation: TransactionCalculation,
        transactionIdCreation: TransactionIdCreation,
        rewardTransactionCreation: RewardTransactionCreation,
        transactionConversion: TransactionConversion,
      },
    };
  }
}
