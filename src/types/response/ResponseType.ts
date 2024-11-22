export type TransactionsPostResponseData = {
  newTransaction: TransactionData;
};

export type NodesDataPostResponse = {
  connectedTo: string[];
};

export type NodesDataPatchResponse = {
  addedNode: string;
  addedIn: string;
};

export type NodesDataPutResponse = {
  nodeUrl: string;
  connectedNodes: string[];
};
