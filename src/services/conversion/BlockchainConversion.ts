import { BlockMiningType } from '../../types/block.types';
import { IBlockchain } from '../../types/blockchain.types';
import { BlockConversionType, NodeConversionType, TransactionConversionType } from '../../types/conversion.types';
import { BlockCreationType, HashCreationType, KeyCreationType, NodeAddressCreationType, NodeUrlCreationType } from '../../types/creation.types';
import { BlockDTO, CreateBlockchainRequestDTO, CreateBlockchainResponseDTO, NodeDTO, TransactionDTO } from '../../types/dto.types';
import { TargetManagementType } from '../../types/management.types';
import { BlockchainCreation } from '../creation/BlockchainCreation';

export class BlockchainConversion {
  static convertToClass(
    blockchainDTO: CreateBlockchainRequestDTO,
    targetManagement: TargetManagementType,
    blockMining: BlockMiningType,
    blockCreation: BlockCreationType,
    nodeUrlCreation: NodeUrlCreationType,
    nodeAddressCreation: NodeAddressCreationType,
    keyCurveOption: string,
    keyCreation: KeyCreationType,
    mainHashCreation: HashCreationType,
    secondHashCreation: HashCreationType
  ): IBlockchain {
    const { targetZeros, reward, maxTransactionsPerBlock }: CreateBlockchainRequestDTO = blockchainDTO;

    return BlockchainCreation.create(
      targetZeros,
      targetManagement,
      reward,
      maxTransactionsPerBlock,
      blockMining,
      blockCreation,
      nodeUrlCreation,
      nodeAddressCreation,
      keyCurveOption,
      keyCreation,
      mainHashCreation,
      secondHashCreation
    );
  }

  static convertToDTO(
    blockchain: IBlockchain,
    blockConversion: BlockConversionType,
    transactionConversion: TransactionConversionType,
    nodeConversion: NodeConversionType
  ): CreateBlockchainResponseDTO {
    const { target, reward, maxTransactionsPerBlock, node, mempool, blocks } = blockchain;

    const nodeDTO: NodeDTO = nodeConversion.convertToDTO(node);

    const mempoolTransactionsDTO: TransactionDTO[] = transactionConversion.convertAllToDTO(mempool);

    const blocksDTO: BlockDTO[] = blockConversion.convertAllToDTO(blocks, transactionConversion);

    return { target, reward, maxTransactionsPerBlock, node: nodeDTO, mempool: mempoolTransactionsDTO, blocks: blocksDTO };
  }
}
