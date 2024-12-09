import { KeyCreation } from '../../../../utils/creation/KeyCreation';
import { Ripemd160HashCreation } from '../../../../utils/creation/Ripmed160HashCreation';
import { Sha256HashCreation } from '../../../../utils/creation/Sha256HashCreation';
import { TransactionCalculation } from '../../../transaction/calculation/TransacionCalculation';
import { TargetManagement } from '../../target/management/TargetManagement';
import { BlockMining } from '../../../block/mining/BlockMining';
import { BlockCreation } from '../../../block/creation/BlockCreation';
import { LocalHostNodeAddressCreation } from '../../../node/creation/NodeAddressCreation';
import { LocalHostNodeUrlCreation } from '../../../node/creation/NodeUrlCreation';
import { RewardTransactionCreation } from '../../../transaction/creation/RewardTransactionCreation';
import { TransactionIdCreation } from '../../../transaction/creation/TransactionIdCreation';
import { CreateBlockchainDependenciesType } from './types/BlockchainDependenciesCreationType';

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
