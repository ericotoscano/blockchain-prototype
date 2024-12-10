import { ITransaction } from "../../../../types/ITransaction";

export type TransactionCalculationType = {
  getTotalFee(transactions: ITransaction[]): number;
};
