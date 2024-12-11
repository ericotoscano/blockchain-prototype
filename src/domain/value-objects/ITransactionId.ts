export interface ITransactionId {
  getValue(): string;
  equals(otherID: ITransactionId): boolean;
}
