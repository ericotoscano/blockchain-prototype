export type NextBlockPostRequest = {
  minFee: number;
};

export type BlockchainPatchRequest = {
  nextBlock: BlockForPatchRequest;
};

export type BlockForPatchRequest = {
  height: number;
  nonce: number;
  hash: string;
  previousHash: string;
  transactions: TransactionForPatchRequest[];
  timestamp: number;
};

export type NodesPostRequest = {
  nodeUrl: string;
};

export type NodesPutRequest = {
  connectedNodes: string[];
};

export type TransactionsPostRequest = {
  newTransaction: TransactionForPostRequest;
};

export type TransactionForPostRequest = {
  sender: string;
  recipient: string;
  amount: number;
  fee: number;
};

export type TransactionsPatchRequest = {
  newTransaction: TransactionForPatchRequest;
};

export type TransactionForPatchRequest = {
  txId: string;
  status: string;
  sender: string;
  recipient: string;
  amount: number;
  fee: number;
  timestamp: Date;
};
