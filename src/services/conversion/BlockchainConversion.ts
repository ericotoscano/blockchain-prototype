import { Block } from '../../models/Block';
import { BlockInputType } from '../../types/block.types';
import { IBlockchain } from '../../types/blockchain.types';
import { CreateBlockchainDTO, GetBlockchainDTO } from '../../types/dto.types';
import { ITransaction } from '../../types/transaction.types';
import { KeyCreation } from '../../utils/creation/KeyCreation';
import { Ripemd160HashCreation } from '../../utils/creation/Ripmed160HashCreation';
import { Sha256HashCreation } from '../../utils/creation/Sha256HashCreation';
import { BlockCreation } from '../creation/BlockCreation';
import { BlockchainCreation } from '../creation/BlockchainCreation';
import { LocalHostNodeAddressCreation } from '../creation/NodeAddressCreation';
import { LocalHostNodeUrlCreation } from '../creation/NodeUrlCreation';
import { TargetManagement } from '../management/TargetManagement';
import { BlockMining } from '../mining/BlockMining';

export class BlockchainConversion {
  static convertToClass(blockchainDTO: CreateBlockchainDTO): IBlockchain {
    const { targetZeros, reward, maxTransactionsPerBlock }: CreateBlockchainDTO = blockchainDTO;

    return BlockchainCreation.create(
      targetZeros,
      TargetManagement,
      reward,
      maxTransactionsPerBlock,
      BlockMining,
      BlockCreation,
      LocalHostNodeUrlCreation,
      LocalHostNodeAddressCreation,
      'secp256k1',
      KeyCreation,
      Sha256HashCreation,
      Ripemd160HashCreation
    );
  }
  
  static convertToDTO(blockchain: IBlockchain): GetBlockchainDTO {
    const { target, reward, maxTransactionsPerBlock, node, mempool, blocks } = blockchain;

    const convertedTransactions: ITransaction[] = transactionDataConversion.convertAll(transactions);

    const input: BlockInputType = { height, previousHash, transactions: convertedTransactions };

    return new Block(input, nonce, hash, timestamp);
  }
}
