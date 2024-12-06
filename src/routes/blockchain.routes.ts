import { Router } from 'express';

import blockchainMiddlewares from '../middlewares/blockchain.middlewares';
import blockMiddlewares from '../middlewares/block.middlewares';

import blockchainController from '../controllers/blockchain.controller';
import blockController from '../controllers/block.controller';

const { validateBlockchainDTO, validateTargetZeros, validateReward, validateMaxTransactionsPerBlock, validateBlockchain } = blockchainMiddlewares;

const { validateBlockDTO, validateBlockHeight, validateBlockNonce, validateBlockHash, validateBlockPreviousHash, validateBlockTimestamp, validateBlockTransactions } = blockMiddlewares;

const { getBlockchain, createBlockchain } = blockchainController;
const { addBlock } = blockController;

const router: Router = Router();

router.route('/').post(validateBlockchainDTO, validateTargetZeros, validateReward, validateMaxTransactionsPerBlock, createBlockchain).get(validateBlockchain, getBlockchain);

router
  .route('/blocks')
  .post(validateBlockchain, validateBlockDTO, validateBlockHeight, validateBlockNonce, validateBlockHash, validateBlockPreviousHash, validateBlockTimestamp, validateBlockTransactions, addBlock);

/*
router.route('/blocks/transmission').post(sendNextBlock);

 router
  .route('/nodes')
  .post(validateBlockchainStructure, checkNewNodeData, sendNewNode)
  .patch(validateBlockchainStructure, checkNewNodeData, addNewNode)
  .put(validateBlockchainStructure, checkConnectedNodesData, updateConnectedNodes);

  GET para pegar as transacoes a serem minadas
router.route('/transactions').post(validateBlockchainStructure, checkSendNewTransactionData, sendNewTransaction).patch(validateBlockchainStructure, checkAddNewTransactionData, addNewTransaction); */

export default router;
