import express, { Express, json } from 'express';
import 'dotenv/config';

import blockchainRoutes from '../src/routes/blockchain.routes';
import transactionsRoutes from './routes/transactions.routes';

const app: Express = express();

const PORT: string = process.env.PORT || '3000';

app.use(json());

app.use('/blockchain', blockchainRoutes);
app.use('/transactions', transactionsRoutes);

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});

/* 
let transactions = [];
let allTransactions = [];


app.post('/transactions', (req, res) => {
  const from = req.body.from;
  const to = req.body.to;
  const amount = req.body.amount;

  let transaction = new Transaction(from, to, amount);
  transactions.push(transaction);

  res.json(transactions);
});

app.get('/resolve', (req, res) => {
  nodes.forEach((node) => {
    fetch(`${node.url}/blockchain`)
      .then((response) => response.json())
      .then((otherBlockchain) => {
        if (blockchain.blocks.length < otherBlockchain.blocks.length) {
          allTransactions.forEach((transaction) => {
            fetch(`${node.url}/transactions`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(transaction),
            })
              .then((response) => response.json())
              .then((_) => {
                fetch(`${node.url}/mine`)
                  .then((response) => response.json())
                  .then((_) => {
                    fetch(`${node.url}/blockchain`)
                      .then((response) => response.json)
                      .then((updatedBlockchain) => {
                        console.log(updatedBlockchain);
                        blockchain = updatedBlockchain;
                        res.json(blockchain);
                      });
                  });
              });
          });
        } else {
          res.json(blockchain);
        }
      });
  });
});

app.get('/mine', (req, res) => {
  let block = blockchain.getNextBlock(transactions);
  blockchain.addBlock(block);

  transactions.forEach((transaction) => {
    allTransactions.push(transaction);
  });

  transactions = [];

  res.json(block);
});
*/
