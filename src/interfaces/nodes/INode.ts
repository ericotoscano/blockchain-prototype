import { IConnectedNodes } from './IConnectedNodes';
import { INodeAddressCreation } from '../creation/INodeAddressCreation';

import { NodeUrlCreationType } from '../../types/creation/NodeUrlCreationType';

export interface INode {
  readonly nodeUrl: string;
  readonly nodeAddress: string;
  connectedNodes: IConnectedNodes[];
  readonly nodeUrlCreation: NodeUrlCreationType;
  readonly nodeAddressCreation: INodeAddressCreation;
  setConnectedNodes(connectedNodes: IConnectedNodes[]): void;
}
