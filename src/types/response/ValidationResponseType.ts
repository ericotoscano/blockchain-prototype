import { ResponseBaseType } from './ResponseBaseType';

export type ValidationResponseType = ResponseBaseType & {
  result: boolean;
};
