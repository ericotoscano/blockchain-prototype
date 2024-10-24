import { Blocks } from '../models/Blocks';
import { Transactions } from '../models/Transactions';
export interface RegisterNodeResponse {
  message: string;
  data?: { registeredNode: string; registeredIn: string };
  error?: { code?: number; message?: string };
}
export interface UpdateNetworkNodesResponse {
  message: string;
  data?: { currentNodeUrl: string; networkNodes: string[] };
  error?: { code?: number; message?: string };
}
export interface ConnectNodesResponse {
  message: string;
  data?: { connectedTo: string[] };
  error?: { code?: number; message?: string };
}
export interface RegisterTransactionInMempoolResponse {
  message: string;
  data?: { transaction: Transactions };
  error?: { code?: number; message?: string };
}
export interface SendTransactionToMempoolResponse {
  message: string;
  data?: { transaction: { txId: string; status: string; timestamp: Date; sender: string; recipient: string; amount: number; fee: number } };
  error?: { code?: number; message?: string };
}
export interface getAllPendingTransactionsResponse {
  message: string;
  data?: { pendingTransactions: Transactions[] };
  error?: { code?: number; message?: string };
}
export interface BroadcastMinedBlockResponse {
  message: string;
  data?: { block: Blocks; from: string };
  error?: { code?: number; message?: string };
}
