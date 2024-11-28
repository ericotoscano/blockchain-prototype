import { Router } from 'express';

import blockchainMiddlewares from '../middlewares/blockchain.middlewares';
import blockMiddlewares from '../middlewares/block.middlewares';
import nodesMiddlewares from '../middlewares/nodes.middlewares';
import transactionsMiddlewares from '../middlewares/transactions.middlewares';

import blockchainController from '../controllers/blockchain.controller';

const { validateBlockchainStructure /* validateMempoolTransactionsByMinFee, selectMempoolTransactionsByMinFee */ } = blockchainMiddlewares;

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

const { getBlockchain, createBlockchain /* mineNextBlock, addNextBlock, sendNextBlock  sendNewNode, addNewNode, updateConnectedNodes, sendNewTransaction, addNewTransaction */ } = blockchainController;

const router: Router = Router();

//COMECAR DAQUI!!!!! Escrever middlewares: validateTargetZeros, validateReward, validateMaxTransactionsPerBlock

/* function validateCreateBlockchainRequest(data: any): boolean {
  const requiredKeys = ["targetZeros", "reward", "maxTransactionsPerBlock"];
  
  // Verifica se todas as propriedades esperadas estão presentes
  const hasAllRequiredKeys = requiredKeys.every((key) => key in data);

  // Verifica se existem propriedades extras
  const hasNoExtraKeys = Object.keys(data).every((key) => requiredKeys.includes(key));

  return hasAllRequiredKeys && hasNoExtraKeys && isValidTypes;
}
 */

router.route('/').post(createBlockchain).get(validateCreateBlockchainRequestDTOStructure, validateTargetZeros, validateReward, validateMaxTransactionsPerBlock, validateBlockchainStructure, getBlockchain);

/*router.route('/blocks/mining').post(validateBlockchainStructure, validateNextBlockTransactionsMinFee, validateMempoolTransactionsByMinFee, selectMempoolTransactionsByMinFee, mineNextBlock);

router
  .route('/blocks')
  .post(
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

router.route('/blocks/transmission').post(sendNextBlock);

 router
  .route('/nodes')
  .post(validateBlockchainStructure, checkNewNodeData, sendNewNode)
  .patch(validateBlockchainStructure, checkNewNodeData, addNewNode)
  .put(validateBlockchainStructure, checkConnectedNodesData, updateConnectedNodes);

  GET para pegar as transacoes a serem minadas
router.route('/transactions').post(validateBlockchainStructure, checkSendNewTransactionData, sendNewTransaction).patch(validateBlockchainStructure, checkAddNewTransactionData, addNewTransaction); */

export default router;
