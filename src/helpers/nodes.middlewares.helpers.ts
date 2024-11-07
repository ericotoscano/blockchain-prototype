import { CheckReturn } from '../types/check.types';

import { checkNodeUrl } from './ports.helpers';

export const checkNewNodeFormat = (nodeUrl: string): CheckReturn => {
  if (!nodeUrl || typeof nodeUrl !== 'string') {
    return { result: false, message: 'The new node url is not a string or was not provided.' };
  }

  return { result: true, message: 'The new node url format is valid.' };
};

export const checkNewNodeUrlOption = (newNodeUrl: string): CheckReturn => {
  if (!checkNodeUrl(newNodeUrl)) {
    return { result: false, message: 'The new node url does not include one of the available ports in the .env file.' };
  }

  return { result: true, message: 'The new node url option is valid.' };
};

export const checkNewNodeConnections = (newNodeUrl: string): CheckReturn => {
  if (global.blockchain.connectedNodes.includes(newNodeUrl)) {
    return { result: false, message: 'The new node is already connected to the target node.' };
  }

  if (global.blockchain.nodeUrl === newNodeUrl) {
    return { result: false, message: 'The new node is the target node.' };
  }

  return { result: true, message: 'The new node connection is valid.' };
};

export const checkNewConnectedNodesFormat = (connectedNodes: string[]): CheckReturn => {
  if (!connectedNodes || !Array.isArray(connectedNodes)) {
    return { result: false, message: 'The new connected nodes is not an array or was not provided.' };
  }

  return { result: true, message: 'The new connected nodes are valid.' };
};

export const checkNewConnectedNodes = (connectedNodes: string[]): CheckReturn => {
  const invalidNodeUrl = connectedNodes.filter((connectedNodeUrl) => !checkNodeUrl(connectedNodeUrl));

  if (invalidNodeUrl.length !== 0) {
    return { result: false, message: 'The connected nodes include one or more invalid nodes.' };
  }

  if (connectedNodes.includes(blockchain.nodeUrl)) {
    return { result: false, message: 'The connected nodes include the target node.' };
  }

  return { result: true, message: 'The new connected nodes are valid.' };
};
