import { Router } from 'express';

import blockchainMiddlewares from '../middlewares/blockchain.middlewares';
import blockMiddlewares from '../middlewares/block.middlewares';
import nodesMiddlewares from '../middlewares/nodes.middlewares';
import blocksMiddlewares from '../middlewares/blocks.middlewares';
import transactionsMiddlewares from '../middlewares/transactions.middlewares';

import blockchainController from '../controllers/blockchain.controller';

const { validateBlockchainCreation } = blockchainMiddlewares;
const { validateBlockFormat, validateBlockHeight, validateBlockNonce, validateBlockHash, validateBlockPreviousHash, validateBlockTransactions, validateBlockTimestamp } = blockMiddlewares;
const { checkNewNodeData, checkConnectedNodesData } = nodesMiddlewares;
const { checkSendNextBlockData } = blocksMiddlewares;
const { checkSendNewTransactionData, checkAddNewTransactionData } = transactionsMiddlewares;

const { getBlockchain, sendNextBlock, addNextBlock, sendNewNode, addNewNode, updateConnectedNodes, sendNewTransaction, addNewTransaction } = blockchainController;

const router: Router = Router();

router
  .route('/')
  .get(validateBlockchainCreation, getBlockchain)
  .patch(
    validateBlockchainCreation,
    validateBlockFormat,
    validateBlockHeight,
    validateBlockNonce,
    validateBlockHash,
    validateBlockPreviousHash,
    validateBlockTransactions,
    validateBlockTimestamp,
    addNextBlock
  );

router
  .route('/nodes')
  .post(validateBlockchainCreation, checkNewNodeData, sendNewNode)
  .patch(validateBlockchainCreation, checkNewNodeData, addNewNode)
  .put(validateBlockchainCreation, checkConnectedNodesData, updateConnectedNodes);

router.route('/next-block').post(validateBlockchainCreation, checkSendNextBlockData, sendNextBlock);

router.route('/transactions').post(validateBlockchainCreation, checkSendNewTransactionData, sendNewTransaction).patch(validateBlockchainCreation, checkAddNewTransactionData, addNewTransaction);

export default router;
