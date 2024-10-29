import { Router } from 'express';

import blockchainController from '../controllers/blockchain.controller';

import blockchainMiddlewares from '../middlewares/blockchain.middlewares';
import transactionsMiddlewares from '../middlewares/transactions.middlewares';
import blocksMiddlewares from '../middlewares/blocks.middlewares';

const {
  connectNodes,
  registerNewNode,
  updateConnectedNodes,
  getAllPendingTransactions,
  broadcastNewTransaction,
  registerNewTransaction,
  getBlockchain,
  registerNewBlock,
  broadcastNextBlock,
  updateBlockchain,
} = blockchainController;

const { validateBlockchain, validateNewNode, validateNewNodeUrlOption, validateNewNodeConnection, validateNewConnectedNodes, validatePendingTransactions } = blockchainMiddlewares;

const { validateNewBlock, validateNewBlockHeight, validateNewBlockNonce, validateNewBlockHash, validateNewBlockPreviousHash, validateNewBlockTransactions, validateTransactionsPerBlock } =
  blocksMiddlewares;

const { validateNewTransaction, validateNewTransactionAddresses, validateNewTransactionValues, validateNewTransactionStatus, validateNewTransactionTimestamp, validateNewTransactionTxId } =
  transactionsMiddlewares;

const router: Router = Router();

//organizar a rota '/' de acordo com o padrão das outras

router
  .route('/')
  .get(validateBlockchain, getBlockchain)
  .post(validateBlockchain, validateTransactionsPerBlock, broadcastNextBlock)
  .put(validateBlockchain, validateNewBlock, validateNewBlockHeight, validateNewBlockNonce, validateNewBlockHash, validateNewBlockPreviousHash, validateNewBlockTransactions, registerNewBlock)
  .patch(validateBlockchain, updateBlockchain); //consenso

router
  .route('/transactions')
  .get(validateBlockchain, validatePendingTransactions, getAllPendingTransactions)
  .post(
    validateBlockchain,
    validateNewTransaction,
    validateNewTransactionAddresses,
    validateNewTransactionValues,
    validateNewTransactionStatus,
    validateNewTransactionTimestamp,
    validateNewTransactionTxId,
    broadcastNewTransaction
  )
  .put(registerNewTransaction); //criar novos middlewares para receber a transacao ja pronta e verificar
//.delete transações que forem incluidas no bloco

router
  .route('/nodes')
  .post(validateBlockchain, validateNewNode, validateNewNodeUrlOption, validateNewNodeConnection, connectNodes)
  .put(validateBlockchain, validateNewNode, validateNewNodeUrlOption, validateNewNodeConnection, registerNewNode)
  .patch(validateBlockchain, validateNewConnectedNodes, updateConnectedNodes);

export default router;
