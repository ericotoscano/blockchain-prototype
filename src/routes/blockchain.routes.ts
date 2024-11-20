import { Router } from 'express';

import blockchainMiddlewares from '../middlewares/blockchain.middlewares';
import blockMiddlewares from '../middlewares/block.middlewares';
import nodesMiddlewares from '../middlewares/nodes.middlewares';
import blocksMiddlewares from '../middlewares/blocks.middlewares';
import transactionsMiddlewares from '../middlewares/transactions.middlewares';

import blockchainController from '../controllers/blockchain.controller';

const { validateBlockchainStructure } = blockchainMiddlewares;
const { validateBlockStructure, validateBlockHeight, validateBlockNonce, validateBlockHash, validateBlockPreviousHash, validateBlockTransactions, validateBlockTimestamp } = blockMiddlewares;
const { checkNewNodeData, checkConnectedNodesData } = nodesMiddlewares;
const { checkSendNextBlockData } = blocksMiddlewares;
const { checkSendNewTransactionData, checkAddNewTransactionData } = transactionsMiddlewares;

const { getBlockchain, sendNextBlock, addNextBlock, sendNewNode, addNewNode, updateConnectedNodes, sendNewTransaction, addNewTransaction } = blockchainController;

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
  );//ate aqui ok

router
  .route('/nodes')
  .post(validateBlockchainStructure, checkNewNodeData, sendNewNode)
  .patch(validateBlockchainStructure, checkNewNodeData, addNewNode)
  .put(validateBlockchainStructure, checkConnectedNodesData, updateConnectedNodes);

router.route('/next-block').post(validateBlockchainStructure, checkSendNextBlockData, sendNextBlock);

router.route('/transactions').post(validateBlockchainStructure, checkSendNewTransactionData, sendNewTransaction).patch(validateBlockchainStructure, checkAddNewTransactionData, addNewTransaction);

export default router;
