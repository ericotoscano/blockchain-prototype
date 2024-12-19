export default interface INodeUrl {
  getValue(): string;
  equals(otherNodeUrl: INodeUrl): boolean;
}
