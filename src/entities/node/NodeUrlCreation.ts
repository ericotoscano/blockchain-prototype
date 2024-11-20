export class LocalHostNodeUrlCreation {
  static create(): string {
    return `http://localhost:${process.argv[2]}`;
  }
}
