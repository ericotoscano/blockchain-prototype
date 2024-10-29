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

const { validateBlockchain, validateNewNodeData, validateNewNodeUrlOption, validateNewNodeConnection, validateNewConnectedNodes, validatePendingTransactions } = blockchainMiddlewares;

const { validateNewBlock, validateNewBlockHeight, validateNewBlockNonce, validateNewBlockHash, validateNewBlockPreviousHash, validateNewBlockTransactions, validateTransactionsPerBlock } =
  blocksMiddlewares;

const { validateNewTransactionData, validateNewTransactionAddresses, validateNewTransactionValues, validateNewTransactionStatus, validateNewTransactionTimestamp, validateNewTransactionTxId } =
  transactionsMiddlewares;

const router: Router = Router();

//organizar a rota '/' de acordo com o padrão das outras (tirar metodos check e colocar de volta nos middlewares)

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
    validateNewTransactionData,
    validateNewTransactionAddresses,
    validateNewTransactionValues,
    validateNewTransactionStatus,
    validateNewTransactionTimestamp,
    validateNewTransactionTxId,
    broadcastNewTransaction
  )
  .put(
    validateNewTransactionData,
    validateNewTransactionAddresses,
    validateNewTransactionValues,
    validateNewTransactionStatus,
    validateNewTransactionTimestamp,
    validateNewTransactionTxId,
    registerNewTransaction
  );
//.delete transações que forem incluidas no bloco

router
  .route('/nodes')
  .post(validateBlockchain, validateNewNodeData, validateNewNodeUrlOption, validateNewNodeConnection, connectNodes)
  .put(validateBlockchain, validateNewNodeData, validateNewNodeUrlOption, validateNewNodeConnection, registerNewNode)
  .patch(validateBlockchain, validateNewConnectedNodes, updateConnectedNodes);

export default router;
