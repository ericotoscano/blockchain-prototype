import { Request, Response, NextFunction } from 'express';

import { MineNextBlockRequest, SendTransactionToMempoolRequest, RegisterTransactionInMempoolRequest } from '../types/request.types';

import { isValidTimestamp, isValidHexString } from '../utils/time.utils';

const validatePendingTransactions = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { blockchain } = global;

    if (!blockchain.mempool.some((transaction) => transaction.status === 'Pending')) {
      return res.status(404).send({ message: 'There are no pending transactions on mempool.' });
    }

    next();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unexpected error.';

    res.status(500).send({
      message: 'An error occurred.',
      error: {
        code: 500,
        message: errorMessage,
      },
    });
  }
};

const validateAddressesForANewTransaction = async (req: Request<{}, {}, SendTransactionToMempoolRequest>, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { sender, recipient } = req.body;

    if (!sender || !recipient) {
      return res.status(400).send({ message: 'Some of the addresses (sender and recipient) sent are not valid or were not provided.' });
    }

    //quando introduzir endereços, não esquecer de validar os endereços em 'sender' e 'recipient'

    if (sender === recipient) {
      return res.status(400).send({ message: 'The sender and the recipient addresses sent are the same.' });
    }

    next();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unexpected error.';

    res.status(500).send({
      message: 'An error occurred.',
      error: {
        code: 500,
        message: errorMessage,
      },
    });
  }
};

const validateValuesForANewTransaction = async (req: Request<{}, {}, SendTransactionToMempoolRequest>, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { amount, fee } = req.body;

    if (!amount || amount < 0) {
      return res.status(400).send({ message: 'The amount sent is not valid or was not provided.' });
    }

    if (!fee || fee < 0) {
      return res.status(400).send({ message: 'The fee sent is not valid or was not provided.' });
    }

    //amount e fee são valores que batem com o saldo do endereço do sender

    next();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unexpected error.';

    return res.status(500).send({
      message: 'An error occurred.',
      error: {
        code: 500,
        message: errorMessage,
      },
    });
  }
};

const validateTransaction = async (req: Request<{}, {}, RegisterTransactionInMempoolRequest>, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { transaction } = req.body;

    if (!transaction) {
      return res.status(400).send({ message: 'The transaction was not provided.' });
    }

    next();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unexpected error.';

    return res.status(500).send({
      message: 'An error occurred.',
      error: {
        code: 500,
        message: errorMessage,
      },
    });
  }
};

const validateAddressesOfTransaction = async (req: Request<{}, {}, RegisterTransactionInMempoolRequest>, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { transaction } = req.body;

    const { sender, recipient } = transaction;

    if (!sender || !recipient) {
      return res.status(400).send({ message: 'Some of the addresses (sender and recipient) in the sent transaction are not valid or were not provided.' });
    }

    //quando introduzir endereços, não esquecer de validar os endereços em 'sender' e 'recipient'

    if (sender === recipient) {
      return res.status(400).send({ message: 'The sender and the recipient addresses in the sent transaction are the same.' });
    }
    next();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unexpected error.';

    return res.status(500).send({
      message: 'An error occurred.',
      error: {
        code: 500,
        message: errorMessage,
      },
    });
  }
};

const validateValuesOfTransaction = async (req: Request<{}, {}, RegisterTransactionInMempoolRequest>, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { transaction } = req.body;

    const { amount, fee } = transaction;

    if (!amount || amount < 0) {
      return res.status(400).send({ message: 'The amount in the sent transaction is not valid or was not provided.' });
    }

    if (!fee || fee < 0) {
      return res.status(400).send({ message: 'The fee in the sent transaction is not valid or was not provided.' });
    }

    //amount e fee são valores que batem com o saldo do endereço do sender

    next();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unexpected error.';

    return res.status(500).send({
      message: 'An error occurred.',
      error: {
        code: 500,
        message: errorMessage,
      },
    });
  }
};

const validateStatusOfTransaction = async (req: Request<{}, {}, RegisterTransactionInMempoolRequest>, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { transaction } = req.body;

    const { status } = transaction;

    if (!status) {
      return res.status(400).send({ message: 'The status of the sent transaction was not provided.' });
    }

    if (status !== 'Pending') {
      return res.status(400).send({ message: "The status of the sent transaction is not valid (must be 'Pending')." });
    }

    next();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unexpected error.';

    return res.status(500).send({
      message: 'An error occurred.',
      error: {
        code: 500,
        message: errorMessage,
      },
    });
  }
};

const validateTimestampOfTransaction = async (req: Request<{}, {}, RegisterTransactionInMempoolRequest>, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { transaction } = req.body;

    const { timestamp } = transaction;

    if (!timestamp) {
      return res.status(400).send({ message: 'The timestamp of the sent transaction was not provided.' });
    }

    if (!isValidTimestamp(timestamp)) {
      return res.status(400).send({ message: 'The timestamp of the sent transaction is not valid.' });
    }

    next();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unexpected error.';

    return res.status(500).send({
      message: 'An error occurred.',
      error: {
        code: 500,
        message: errorMessage,
      },
    });
  }
};

const validateTxIdOfTransaction = async (req: Request<{}, {}, RegisterTransactionInMempoolRequest>, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { transaction } = req.body;
    const { txId } = transaction;
    const { blockchain } = global;

    if (!txId) {
      return res.status(400).send({ message: 'The txId of the sent transaction was not provided.' });
    }

    if (!isValidHexString(txId)) {
      return res.status(400).send({ message: 'The txId of the sent transaction is not valid.' });
    }

    if (!blockchain.checkTransactionIsNotInMempool(transaction)) {
      return res.status(200).send({
        message: 'The sent transaction is already on the mempool.',
      });
    }

    next();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unexpected error.';

    res.status(500).send({
      message: 'An error occurred.',
      error: {
        code: 500,
        message: errorMessage,
      },
    });
  }
};

const validateTransactionsPerBlock = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { nextBlockTransactions }: MineNextBlockRequest = req.body;
    const { blockchain } = global;

    if (nextBlockTransactions.length !== blockchain.maxTransactionsPerBlock - 1) {
      return res.status(200).send({
        message: "Considering the miner's reward transaction, the number of transactions sent must be equal recipient the maximum number of transactions per block minus one.",
        data: { maxTransacionsPerBlock: blockchain.maxTransactionsPerBlock },
      });
    }

    next();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unexpected error.';

    res.status(500).send({
      message: 'An error occurred.',
      error: {
        code: 500,
        message: errorMessage,
      },
    });
  }
};

export default {
  validatePendingTransactions,
  validateAddressesForANewTransaction,
  validateValuesForANewTransaction,
  validateTransaction,
  validateAddressesOfTransaction,
  validateValuesOfTransaction,
  validateStatusOfTransaction,
  validateTimestampOfTransaction,
  validateTxIdOfTransaction,
  validateTransactionsPerBlock,
};
