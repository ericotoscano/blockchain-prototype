import { BlockCreation } from '../../services/block/creation/BlockCreation';
import { BlockMining } from '../../services/block/mining/BlockMining';
import { TargetManagement } from '../../services/blockchain/target/management/TargetManagement';
import { LocalHostNodeAddressCreation } from '../../services/node/creation/NodeAddressCreation';
import { LocalHostNodeUrlCreation } from '../../services/node/creation/NodeUrlCreation';
import { TransactionCalculation } from '../../services/transaction/calculation/TransacionCalculation';
import { RewardTransactionCreation } from '../../services/transaction/creation/RewardTransactionCreation';
import { TransactionIdCreation } from '../../services/transaction/creation/TransactionIdCreation';
import { KeyCreation } from '../utils/KeyCreation';
import { Ripemd160HashCreation } from '../utils/Ripmed160HashCreation';
import { Sha256HashCreation } from '../utils/Sha256HashCreation';
import { CreateBlockchainDependenciesType } from './BlockchainDependenciesCreationTypes';

export class BlockchainDependenciesCreation {
  static createBlockchain(): CreateBlockchainDependenciesType {
    return {
      nodeDependencies: { nodeUrlCreation: LocalHostNodeUrlCreation, nodeAddressCreation: LocalHostNodeAddressCreation },
      keyDependencies: { keyCurveOption: 'secp256k1', keyCreation: KeyCreation, mainHashCreation: Sha256HashCreation, secondHashCreation: Ripemd160HashCreation },
      miningDependencies: {
        targetManagement: TargetManagement,
        blockMining: BlockMining,
        blockCreation: BlockCreation,
        hashCreation: Sha256HashCreation,
      },
      transactionDependencies: { transactionCalculation: TransactionCalculation, transactionIdCreation: TransactionIdCreation, rewardTransactionCreation: RewardTransactionCreation },
    };
  }
}