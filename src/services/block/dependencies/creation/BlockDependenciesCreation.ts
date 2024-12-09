import { AddBlockDependenciesType } from '../../../../types/dependencies.types';
import { Sha256HashCreation } from '../../../../utils/creation/Sha256HashCreation';
import { TransactionCalculation } from '../../../transaction/calculation/TransacionCalculation';
import { TransactionConversion } from '../../../transaction/conversion/TransactionConversion';
import { BlockMining } from '../../mining/BlockMining';
import { RewardTransactionCreation } from '../../../transaction/creation/RewardTransactionCreation';
import { TransactionIdCreation } from '../../../transaction/creation/TransactionIdCreation';

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
