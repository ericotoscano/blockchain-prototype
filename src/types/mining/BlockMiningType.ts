import { MineBlockResultsType } from '../creation/BlockCreationType';
import { HashCreationType } from '../../interfaces/creation/IKeyCreation';

export type BlockMiningType = {
  mine(data: string, target: string, hashCreation: HashCreationType): MineBlockResultsType;
};
