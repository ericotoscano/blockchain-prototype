import { Request, Response, NextFunction } from 'express';

import { NextBlockPatchRequest } from '../types/request.types';
import { CustomResponse, ErrorDataResponse } from '../types/response.types';

import { checkNextBlockDataFormat } from '../helpers/middlewares.helpers';
import { isValidHex64String } from '../utils/validation.utils';

const checkNextBlockData = async (req: Request<{}, {}, NextBlockPatchRequest>, res: Response<CustomResponse<ErrorDataResponse>>, next: NextFunction): Promise<void> => {
  try {
    const { nextBlock } = req.body;

    const { result, message } = checkNextBlockDataFormat(nextBlock);

    if (!result) {
      res.status(400).send({
        message: 'Client Error',
        data: { code: 11, message },
      });
      return;
    }

    next();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unexpected error.';

    res.status(500).send({
      message: 'An error occurred.',
      data: { code: 500, message: errorMessage },
    });
    return;
  }
};

const checkNextBlockHeight = async (req: Request<{}, {}, NextBlockPatchRequest>, res: Response<CustomResponse<ErrorDataResponse>>, next: NextFunction): Promise<void> => {
  try {
    const { nextBlock } = req.body;
    const { height } = nextBlock;

    if (height < 0 || !Number.isInteger(height)) {
      res.status(400).send({ message: 'Client Error', data: { code: 10, message: 'The next block height is a negative number or is not a integer number.' } });
      return;
    }

    if (height !== blockchain.blocks.length) {
      res.status(400).send({ message: 'Client Error', data: { code: 10, message: 'The next block height is not the right next block height in blockchain.' } });
      return;
    }

    next();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unexpected error.';

    res.status(500).send({
      message: 'An error occurred.',
      data: { code: 500, message: errorMessage },
    });
    return;
  }
};

const checkNextBlockNonce = async (req: Request<{}, {}, NextBlockPatchRequest>, res: Response<CustomResponse<ErrorDataResponse>>, next: NextFunction): Promise<void> => {
  try {
    const { nextBlock } = req.body;
    const { nonce } = nextBlock;

    if (nonce < 0 || !Number.isInteger(nonce)) {
      res.status(400).send({ message: 'Client Error', data: { code: 10, message: 'The next block nonce is a negative number or is not a integer number.' } });
      return;
    }

    next();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unexpected error.';

    res.status(500).send({
      message: 'An error occurred.',
      data: { code: 500, message: errorMessage },
    });
    return;
  }
};

const checkNextBlockHash = async (req: Request<{}, {}, NextBlockPatchRequest>, res: Response<CustomResponse<ErrorDataResponse>>, next: NextFunction): Promise<void> => {
  try {
    const { nextBlock } = req.body;
    const { hash } = nextBlock;

    if (!isValidHex64String(hash)) {
      res.status(400).send({ message: 'Client Error', data: { code: 10, message: 'The next block hash is not a valid hex string.' } });
      return;
    }

    //verificar se o hash bate com o hash esperado

    next();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unexpected error.';

    res.status(500).send({
      message: 'An error occurred.',
      data: { code: 500, message: errorMessage },
    });
    return;
  }
};

const checkNextBlockPreviousHash = async (req: Request<{}, {}, NextBlockPatchRequest>, res: Response<CustomResponse<ErrorDataResponse>>, next: NextFunction): Promise<void> => {
  try {
    const { nextBlock } = req.body;
    const { previousHash } = nextBlock;

    if (!isValidHex64String(previousHash)) {
      res.status(400).send({ message: 'Client Error', data: { code: 10, message: 'The next block previous hash is not a valid hex string.' } });
      return;
    }

    if (blockchain.getPreviousBlock().hash !== previousHash) {
      res.status(400).send({ message: 'Client Error', data: { code: 10, message: 'The next block previous hash and the last valid block hash in blockchain are not the same.' } });
      return;
    }

    next();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unexpected error.';

    res.status(500).send({
      message: 'An error occurred.',
      data: { code: 500, message: errorMessage },
    });
    return;
  }
};

const checkNextBlockTransactions = async (req: Request<{}, {}, NextBlockPatchRequest>, res: Response<CustomResponse<ErrorDataResponse>>, next: NextFunction): Promise<void> => {
  try {
    const { nextBlock } = req.body;
    const { transactions } = nextBlock;

    if (transactions.length === 0) {
      res.status(400).send({ message: 'Client Error', data: { code: 10, message: 'The next block transactions is an empty array.' } });
      return;
    }

    next();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unexpected error.';

    res.status(500).send({
      message: 'An error occurred.',
      data: { code: 500, message: errorMessage },
    });
    return;
  }
};
/* 
const validateTransactionsIds = async (req: Request<{}, {}, NextBlockPatchRequest>, res: Response<CustomResponse<ErrorDataResponse>>, next: NextFunction): Promise<void> => {
  try {
    const { nextBlock } = req.body;
    const { transactions } = nextBlock;

    const notInMempool = transactions.filter((transaction) => !blockchain.mempool.some((mempoolTransaction) => mempoolTransaction.txId === transaction.txId));

    if (notInMempool.some((transaction) => transaction.sender !== 'Reward')) {
      const transactionIds = notInMempool.map((transaction) => transaction.txId).join(', ');

      res.status(400).send({ message: 'Client Error', data: { code: 10, message: `The following txId's of the next block transactions are not included in mempool: ${transactionIds}.`,
      }});
      return;
    }

    next();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unexpected error.';

    res.status(500).send({
      message: 'An error occurred.',
      data: {
        code: 500,
        message: errorMessage,
      },
    });
    return;
  }
};

const validateTransactionsStatus = async (req: Request<{}, {}, NextBlockPatchRequest>, res: Response<CustomResponse | <ErrorDataResponse>>, next: NextFunction): Promise<void> => {
  try {
    const { nextBlock } = req.body;
    const { transactions } = nextBlock;

    const notPendingStatus = transactions.filter((transaction) => transaction.status !== 'Pending');

    if (notPendingStatus.length > 0) {
      const transactionIds = notPendingStatus.map((transaction) => transaction.txId).join(', ');

      res.status(400).send({
        message: `The following txId's of the next block transactions are not with 'Pending' status: ${transactionIds}.`,
      });
      return;
    }

    next();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unexpected error.';

    res.status(500).send({
      message: 'An error occurred.',
      data: {
        code: 500,
        message: errorMessage,
      },
    });
    return;
  }
}; */

const checkTransactionsPerBlock = async (req: Request<{}, {}, NextBlockPatchRequest>, res: Response<CustomResponse<ErrorDataResponse>>, next: NextFunction): Promise<void> => {
  try {
    const { nextBlock } = req.body;
    const { transactions } = nextBlock;

    if (transactions.length > blockchain.maxTransactionsPerBlock - 1) {
      res
        .status(400)
        .send({
          message: 'Client Error',
          data: { code: 10, message: "Considering the miner's reward transaction, the number of next block transactions must be equal to the maximum number of transactions per block, minus one." },
        });
      return;
    }

    next();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unexpected error.';

    res.status(500).send({
      message: 'An error occurred.',
      data: {
        code: 500,
        message: errorMessage,
      },
    });
    return;
  }
};

export default {
  checkNextBlockData,
  checkNextBlockHeight,
  checkNextBlockNonce,
  checkNextBlockHash,
  checkNextBlockPreviousHash,
  checkNextBlockTransactions,
  /*   validateTransactionsIds,
  validateTransactionsStatus, */
  checkTransactionsPerBlock,
};
