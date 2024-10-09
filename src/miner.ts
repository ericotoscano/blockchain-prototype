/* quando o cliente solicitar a mineracao

interface ResponseData {
  pendingTransactions: Transaction[];
}

const response = await fetch('http://localhost:3000/transactions');
const { data }: { data: ResponseData } = await response.json();
const { pendingTransactions } = data;

const allFees = pendingTransactions.reduce((sum, transaction) => sum + transaction.fee, 0);

pendingTransactions.unshift(new Transaction('Block Reward', 'Miner Address', 3.125 + allFees, 0));

pendingTransactions.splice(blockchainCurrentState.maxTransactionsPerBlock - 1);
 */