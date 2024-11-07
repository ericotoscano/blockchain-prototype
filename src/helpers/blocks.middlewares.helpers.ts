import { CheckReturn } from '../types/check.types';

export const checkMinFeeFormat = (minFee: number): CheckReturn => {
  if (!minFee || minFee < 0 || typeof minFee !== 'number') {
    return { result: false, message: 'The minFee is not a positive number or was not provided.' };
  }

  return { result: true, message: 'The minimun fee is valid.' };
};

export const checkMempoolPendingTransactions = () => {
  if (global.blockchain.mempool.every((mempoolTransaction) => mempoolTransaction.status !== 'Pending')) {
    return { result: false, message: 'There are no pending transactions on mempool.' };
  }

  return { result: true, message: 'There are pending transactions on mempool.' };
};
