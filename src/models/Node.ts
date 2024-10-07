import { NodeType } from './types/node.types';

export class Node implements NodeType {
  url: string;

  constructor(url: string) {
    this.url = url;
  }
}
