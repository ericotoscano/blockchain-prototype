export interface RegisterNodeResponse {
  message: string;
  data: { target: string };
}
export interface UpdateNetworkNodesResponse {
  message: string;
  data: { connectedNodes: string[] };
}
