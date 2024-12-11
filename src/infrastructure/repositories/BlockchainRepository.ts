import { IBlockchain } from '../../domain/types/IBlockchain';
import { IBlockchainRepository } from '../../domain/repositories/IBlockchainRepository';

export class BlockchainRepository implements IBlockchainRepository {
  constructor(private blockchain: IBlockchain) {}

  getBlockchain(): IBlockchain {
    return { ...this.blockchain };
  }

  getTarget(): string {
    return this.blockchain.getTarget();
  }

  getReward(): number {
    return this.blockchain.getReward();
  }

  getMaxTransactionsPerBlock(): number {
    return this.blockchain.getmaxTransactionsPerBlock();
  }

  updateBlockchain(blockchain: IBlockchain): void {
    this.blockchain = { ...blockchain };
  }
}
