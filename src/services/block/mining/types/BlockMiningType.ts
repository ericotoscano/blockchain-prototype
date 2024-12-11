import { HashCreationType } from '../../../../shared/utils/HashCreationType';

export type BlockMiningType = {
  mine(blockData: string, target: string, hashCreation: HashCreationType): MineResultsType;
};

export type MineResultsType = {
  calculatedHash: string;
  foundNonce: number;
};
