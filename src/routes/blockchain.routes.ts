import { Router } from 'express';

import blockchainMiddlewares from '../middlewares/blockchain/blockchain.middlewares';
import blockMiddlewares from '../middlewares/block/block.middlewares';
import nodesMiddlewares from '../middlewares/nodes/nodes.middlewares';
import transactionsMiddlewares from '../middlewares/transactions/transactions.middlewares';

import blockchainController from '../controllers/blockchain.controller';

const { validateBlockchainStructure, validateMempoolTransactionsByMinFee, selectMempoolTransactionsByMinFee } = blockchainMiddlewares;

const {
  validateBlockStructure,
  validateBlockHeight,
  validateBlockNonce,
  validateBlockHash,
  validateBlockPreviousHash,
  validateBlockTransactions,
  validateNextBlockTransactionsMinFee,
  validateBlockTimestamp,
} = blockMiddlewares;

const { checkNewNodeData, checkConnectedNodesData } = nodesMiddlewares;
const { checkSendNewTransactionData, checkAddNewTransactionData } = transactionsMiddlewares;

const { getBlockchain, addNextBlock, mineNextBlock, sendNewNode, addNewNode, updateConnectedNodes, sendNewTransaction, addNewTransaction } = blockchainController;

const router: Router = Router();

router
  .route('/')
  .get(validateBlockchainStructure, getBlockchain)
  .patch(
    validateBlockchainStructure,
    validateBlockStructure,
    validateBlockHeight,
    validateBlockNonce,
    validateBlockHash,
    validateBlockPreviousHash,
    validateBlockTransactions,
    validateBlockTimestamp,
    addNextBlock
  );

router.route('/next-block').post(validateBlockchainStructure, validateNextBlockTransactionsMinFee, validateMempoolTransactionsByMinFee, selectMempoolTransactionsByMinFee, mineNextBlock);
//.post(validateBlockchainStructure, sendNextBlock);

router
  .route('/nodes')
  .post(validateBlockchainStructure, checkNewNodeData, sendNewNode)
  .patch(validateBlockchainStructure, checkNewNodeData, addNewNode)
  .put(validateBlockchainStructure, checkConnectedNodesData, updateConnectedNodes);

router.route('/transactions').post(validateBlockchainStructure, checkSendNewTransactionData, sendNewTransaction).patch(validateBlockchainStructure, checkAddNewTransactionData, addNewTransaction);

export default router;
