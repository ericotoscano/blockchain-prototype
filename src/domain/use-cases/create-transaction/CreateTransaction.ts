import { ITransaction } from "../../../types/ITransaction";
import { ITransactionFactory } from "../../factories/ITransactionFactory";

export class CreateTransaction {
  constructor(private readonly factory: ITransactionFactory) {}

  execute(sender: string, recipient: string, amount: number, fee: number): ITransaction {
    return this.factory.create(sender, recipient, amount, fee);
  }
}
