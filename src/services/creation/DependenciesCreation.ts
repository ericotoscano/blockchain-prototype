import {
  AddBlockDependenciesType,
  CreateBlockchainDependenciesType,
} from "../../types/dependencies.types";
import { KeyCreation } from "../../utils/creation/KeyCreation";
import { Ripemd160HashCreation } from "../../utils/creation/Ripmed160HashCreation";
import { Sha256HashCreation } from "../../utils/creation/Sha256HashCreation";
import { TransactionCalculation } from "../calculation/TransacionCalculation";
import { TransactionConversion } from "../conversion/TransactionConversion";
import { BlockMining } from "../mining/BlockMining";
import { BlockCreation } from "./BlockCreation";
import { LocalHostNodeAddressCreation } from "./NodeAddressCreation";
import { LocalHostNodeUrlCreation } from "./NodeUrlCreation";
import { RewardTransactionCreation } from "./RewardTransactionCreation";
import { TransactionIdCreation } from "./TransactionIdCreation";

export class DependenciesCreation {
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

  static createBlockchain(): CreateBlockchainDependenciesType {
    return {
      keyCurveOption: "secp256k1",
      keyCreation: KeyCreation,
      mainHashCreation: Sha256HashCreation,
      secondHashCreation: Ripemd160HashCreation,
      nodeUrlCreation: LocalHostNodeUrlCreation,
      nodeAddressCreation: LocalHostNodeAddressCreation,
      blockMining: BlockMining,
      blockCreation: BlockCreation,
      transactionCalculation: TransactionCalculation,
      transactionIdCreation: TransactionIdCreation,
      rewardTransactionCreation: RewardTransactionCreation,
    };
  }
}
