import { Router } from 'express';
import { TransactionController } from '../presentation/controllers/TransactionController';
import { SubmitTransactionUseCase } from '../application/use-cases/submit-transaction/SubmitTransactionUseCase';
import { BlockchainRepository } from '../infrastructure/repositories/BlockchainRepository';

const transactionRouter = Router();
