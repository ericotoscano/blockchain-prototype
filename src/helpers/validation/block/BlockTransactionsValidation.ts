import { TransactionForPatchRequest } from "../../../types/request.types";
import { ValidationData } from "../../../types/response.types";

export class BlockTransactionsValidation {
  static validateFormat(
    transactions: TransactionForPatchRequest[]
  ): ValidationData {
    if (!transactions || !Array.isArray(transactions)) {
      const failData = {
        title: "Block Transactions Format Validation",
        result: false,
        type: "Format Fail",
        code: 13,
        message:
          "The block transactions was not provided or has an invalid format (it should be an array).",
      };

      return failData;
    }

    const successData = {
      title: "Block Transactions Format Validation",
      result: true,
      type: "Format Success",
      code: 13,
      message: "The block transactions has a valid format.",
    };

    return successData;
  }
}

//ADICIONAR A CADA CLASSE SEUS METODOS AI DEBAIXO

/*   const transactionsCheckers: CheckerFunction[] = [() => checkNextBlockTransactionsLength(transactions)];

  for (let i = 0; i < transactions.length - 1; i++) {
    const { sender, recipient, amount, fee, status, timestamp, txId } = transactions[i];

    const checkers: CheckerFunction[] = [
      () => checkNextBlockNewTransactionsFormat(transactions[i], i),
      () => checkNextBlockNewTransactionsAddresses(sender, recipient, txId),
      () => checkNextBlockNewTransactionsValues(sender, amount, fee, txId),
      () => checkNextBlockNewTransactionsStatus(status, txId),
      () => checkNextBlockNewTransactionsTimestamp(timestamp, txId),
      () => checkNextBlockNewTransactionsTxId(txId, i),
      () => checkNextBlockNewTransactionsDuplicity(transactions[i], txId),
    ];

  }

  return { result: true, message: 'The next block transactions are valid.' };
}; */

export const checkNextBlockTransactionsLength = (
  transactions: TransactionData[]
): CheckReturn => {
  if (transactions.length === 0) {
    return {
      result: false,
      message: "The next block transactions is an empty array.",
    };
  }

  if (transactions.length > blockchain.maxTransactionsPerBlock) {
    return {
      result: false,
      message:
        "Considering the miner's reward transaction, the number of next block transactions must be equal to the maximum number of transactions per block, minus one.",
    };
  }

  return { result: true, message: "The transactions length is valid." };
};

export const checkNextBlockNewTransactionsFormat = (
  transaction: TransactionData,
  transactionIndex: number
): CheckReturn => {
  if (
    !transaction ||
    typeof transaction !== "object" ||
    Array.isArray(transaction)
  ) {
    return {
      result: false,
      message: `In next block transactions, at index ${transactionIndex}, the transaction was not provided or is not valid.`,
    };
  }
  return {
    result: true,
    message: "All next block transactions format are valid.",
  };
};

export const checkNextBlockNewTransactionsAddresses = (
  sender: string,
  recipient: string,
  txId: string
): CheckReturn => {
  if (!sender || !isValidHex40String(sender)) {
    return {
      result: false,
      message: `In next block transactions, at transaction ${txId}, the sender was not provided or is not an hex 40 string.`,
    };
  }

  if (!recipient || !isValidHex40String(recipient)) {
    return {
      result: false,
      message: `In next block transactions, at transaction ${txId}, the recipient was not provided or is not an hex 40 string.`,
    };
  }

  if (sender === recipient) {
    return {
      result: false,
      message: `In next block transactions, at transaction ${txId}, the sender and recipient addresses are the same.`,
    };
  }

  return {
    result: true,
    message: "All next block transactions addresses are valid.",
  };
};

export const checkNextBlockNewTransactionsValues = (
  sender: string,
  amount: number,
  fee: number,
  txId: string
): CheckReturn => {
  if (sender !== "0".repeat(40)) {
    if (!amount || amount < 0 || typeof amount !== "number") {
      return {
        result: false,
        message: `In next block transactions, at transaction ${txId}, the amount was not provided or is not a positive number.`,
      };
    }

    if (!fee || fee < 0 || typeof fee !== "number") {
      return {
        result: false,
        message: `In next block transactions, at transaction ${txId}, the fee was not provided or is not a positive number.`,
      };
    }
  } else {
    if (amount <= global.blockchain.reward) {
      return {
        result: false,
        message: `In next block's transactions, the amount in the reward transaction ${txId} it should be greater than the current blockchain reward value.`,
      };
    }

    if (fee !== 0) {
      return {
        result: false,
        message: `In the next block's transactions, the fee in the reward transaction ${txId} it should be equal to zero.`,
      };
    }
  }

  return {
    result: true,
    message: "All next block transactions values are valid.",
  };
};

export const checkNextBlockNewTransactionsStatus = (
  status: string,
  txId: string
): CheckReturn => {
  if (!status || status !== "Pending") {
    return {
      result: false,
      message: `In next block transactions, at transaction ${txId}, the status was not provided or is not 'Pending'.`,
    };
  }
  return {
    result: true,
    message: "All next block transactions status are valid.",
  };
};

export const checkNextBlockNewTransactionsTxId = (
  txId: string,
  transactionIndex: number
): CheckReturn => {
  if (!txId || !isValidHex64String(txId)) {
    return {
      result: false,
      message: `In next block transactions, at index ${transactionIndex}, the txId was not provided or is not valid.`,
    };
  }

  return {
    result: true,
    message: "All next block transactions txId are valid.",
  };
};

export const checkNextBlockNewTransactionsDuplicity = (
  transaction: TransactionData,
  txId: string
): CheckReturn => {
  const allConfirmedTransactions = global.blockchain.getConfirmedTransactions();

  if (
    allConfirmedTransactions.some(
      (confirmedTransaction) => confirmedTransaction.txId === transaction.txId
    )
  ) {
    return {
      result: false,
      message: `In the next block transactions, the transaction ${txId} has the same txId of a confirmed transaction in blockchain.`,
    };
  }

  return {
    result: true,
    message: "All next block transactions uniquiness are valid.",
  };
};

export const checkNextBlockNewTransactionsTimestamp = (
  timestamp: Date,
  txId: string
): CheckReturn => {
  if (!timestamp || !isValidTimestamp(timestamp)) {
    return {
      result: false,
      message: `In next block transactions, at transaction ${txId}, the timestamp was not provided or is not valid.`,
    };
  }

  return {
    result: true,
    message: "All next block transactions timestamp are valid.",
  };
};
