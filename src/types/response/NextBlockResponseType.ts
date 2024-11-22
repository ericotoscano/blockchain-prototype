import { BlockDataType } from '../block/BlockDataType';
import { ResponseBaseType } from './ResponseBaseType';

export type NextBlockResponseType = ResponseBaseType & {
  data: { nextBlock: BlockDataType };
};
