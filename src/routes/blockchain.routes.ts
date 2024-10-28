import { Router } from 'express';

import blockchainController from '../controllers/blockchain.controller';

import blockchainMiddlewares from '../middlewares/blockchain.middlewares';
import transactionsMiddlewares from '../middlewares/transactions.middlewares';

const {
  connectNodes,
  registerNode,
  updateConnectedNodes,
  getAllPendingTransactions,
  sendTransactionToMempool,
  registerTransactionInMempool,
  getBlockchain,
  registerCreatedBlock,
  createNextBlock,
  updateBlockchain,
} = blockchainController;

const {
  validateBlockchain,
  validateNextBlock,
  validateHeightOfBlock,
  validateHashOfBlock,
  validatePreviousHashOfBlock,
  validateTransactionsOfBlock,
  validateNonceOfBlock,
  validateNewNode,
  validateNodeUrlOption,
  validateNodeConnection,
  validateNodeRegistration,
  validateConnectedNodes,
} = blockchainMiddlewares;

const {
  validatePendingTransactions,
  validateAddressesForANewTransaction,
  validateValuesForANewTransaction,
  validateTransaction,
  validateAddressesOfTransaction,
  validateValuesOfTransaction,
  validateStatusOfTransaction,
  validateTimestampOfTransaction,
  validateTxIdOfTransaction,
  validateTransactionsPerBlock,
} = transactionsMiddlewares;

const router: Router = Router();

//organizar a rota '/' de acordo com o padrão das outras

router
  .route('/')
  .get(validateBlockchain, getBlockchain)
  .post(validateBlockchain, validateTransactionsPerBlock, createNextBlock)
  .put(
    validateBlockchain,
    validateNextBlock,
    validateHeightOfBlock,
    validateNonceOfBlock,
    validateHashOfBlock,
    validatePreviousHashOfBlock,
    validateTransactionsOfBlock,
    validateNonceOfBlock,
    registerCreatedBlock
  )
  .patch(validateBlockchain, updateBlockchain); //consenso

router
  .route('/transactions')
  .get(validateBlockchain, validatePendingTransactions, getAllPendingTransactions)
  .post(validateBlockchain, validateAddressesForANewTransaction, validateValuesForANewTransaction, sendTransactionToMempool)
  .put(
    validateBlockchain,
    validateTransaction,
    validateAddressesOfTransaction,
    validateValuesOfTransaction,
    validateStatusOfTransaction,
    validateTimestampOfTransaction,
    validateTxIdOfTransaction,
    registerTransactionInMempool
  );
//.delete transações que forem incluidas no bloco

router
  .route('/nodes')
  .post(validateBlockchain, validateNewNode, validateNodeUrlOption, validateNodeConnection, connectNodes)
  .put(validateBlockchain, validateNewNode, validateNodeUrlOption, validateNodeRegistration, registerNode)
  .patch(validateBlockchain, validateConnectedNodes, updateConnectedNodes);

export default router;
