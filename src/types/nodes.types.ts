export interface NodesType {
  currentNodeUrl: string;
  networkNodes: string[];
  addNode(nodeUrl: string): void;
  broadcastNodesTo(nodeUrl: string): string[];
}
