export type NodeDTO = {
  nodeUrl: string;
  nodeAddress: string;
  connectedNodes: ConnectedNodeDTO[];
};

export type ConnectedNodeDTO = {
  nodeUrl: string;
  nodeAddress: string;
};
