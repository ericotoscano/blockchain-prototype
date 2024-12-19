export default interface INodeAddress {
  getValue(): string;
  equals(otherNodeAddress: INodeAddress): boolean;
}
