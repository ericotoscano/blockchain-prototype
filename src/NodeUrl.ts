import INodeUrl from './domain/value-objects/INodeUrl';



export default class NodeUrl implements INodeUrl {
  private readonly value: string;

  constructor(baseUrl: string, port: number, portOptions: number[]) {
    this.validatePortOption(port, portOptions);

    this.value = this.create(baseUrl, port);
  }

  private create(baseUrl: string, port: number): string {
    return baseUrl + port;
  }



  getValue(): string {
    return this.value;
  }

  equals(otherNodeUrl: INodeUrl): boolean {
    if (!otherNodeUrl) return false;

    return this.value === otherNodeUrl.getValue();
  }
}
