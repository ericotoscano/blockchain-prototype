import { Sha256HashCreation } from '../utils/Sha256HashCreation';
import { TransactionCalculation } from '../../services/transaction/calculation/TransacionCalculation';
import { TransactionConversion } from '../../services/transaction/conversion/TransactionConversion';
import { BlockMining } from '../../services/block/mining/BlockMining';
import { RewardTransactionCreation } from '../../services/transaction/creation/RewardTransactionCreation';
import { TransactionIdCreation } from '../../services/transaction/creation/TransactionIdCreation';
import { AddBlockDependenciesType } from './BlockDependenciesCreationTypes';

export class BlockDependenciesCreation {
  static addBlock(): AddBlockDependenciesType {
    return {
      transactionDependencies: {
        transactionConversion: TransactionConversion,
        transactionCalculation: TransactionCalculation,
        transactionIdCreation: TransactionIdCreation,
        rewardTransactionCreation: RewardTransactionCreation,
      },
      miningDependencies: {
        blockMining: BlockMining,
        hashCreation: Sha256HashCreation,
      },
    };
  }
}
