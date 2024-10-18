import { Blockchain } from './models/Blockchain';
declare global {
  var blockchain: Blockchain;
}

global.blockchain = new Blockchain();

export {};
