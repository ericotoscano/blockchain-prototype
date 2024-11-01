import { Blockchain } from './models/Blockchain';
import 'dotenv/config';
declare global {
  var blockchain: Blockchain;
}

global.blockchain = new Blockchain();

export {};
