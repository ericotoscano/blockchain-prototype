import { Blocks } from '../models/Blocks';
import { Transactions } from '../models/Transactions';
export interface RegisterNodeResponse {
  message: string;
  data?: { registeredNode: string; registeredIn: string };
  error?: { code?: number; message?: string };
}
export interface UpdateNetworkNodesResponse {
  message: string;
  data?: { newNode?: { networkNodes?: string[] } };
  error?: { code?: number; message?: string };
}
export interface BroadcastTransactionResponse {
  message: string;
  data?: { transaction: Transactions; from: string; to: string };
  error?: { code?: number; message?: string };
}
export interface BroadcastMinedBlockResponse {
  message: string;
  data?: { block: Blocks; from: string };
  error?: { code?: number; message?: string };
}
