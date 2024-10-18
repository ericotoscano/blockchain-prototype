import { Transactions } from '../models/Transactions';
export interface RegisterNodeResponse {
  message: string;
  data?: { from: string; to: string };
  error?: { code?: number; message?: string };
}
export interface UpdateNetworkNodesResponse {
  message: string;
  data?: { networkNodes?: string[] };
  error?: { code?: number; message?: string };
}
export interface BroadcastTransactionResponse {
  message: string;
  data?: { transaction: Transactions; from: string; to: string };
  error?: { code?: number; message?: string };
}

