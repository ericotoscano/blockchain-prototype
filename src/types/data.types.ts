export interface BlockchainData {
  nodeUrl: string;
  nodeAddress: string;
  connectedNodes: string[];
  targetDifficulty: string;
  reward: number;
  maxTransactionsPerBlock: number;
  mempool: TransactionData[];
  blocks: BlockData[];
}
export interface BlockData {
  height: number;
  nonce: number;
  hash: string;
  previousHash: string;
  transactions: TransactionData[];
}

export interface TransactionData extends PreTransactionData {
  txId: string;
  status: string;
  timestamp: Date;
}

export interface PreTransactionData {
  sender: string;
  recipient: string;
  amount: number;
  fee: number;
}
