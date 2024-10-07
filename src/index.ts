import express, { Express, json } from 'express';
import 'dotenv/config';

import blockchainRoute from '../src/routes/blockchain.route';

const app: Express = express();
const port: string = process.env.PORT || '3000';

app.use(json());

/* const arguments: string[] = process.argv;

if (arguments.length > 2) {
  SERVER_PORT = parseInt(arguments[2]);
} 

let nodes = [];
let transactions = [];
let allTransactions = [];

app.post('/nodes/register', (req, res) => {
  const urls = req.body;

  urls.forEach((url) => {
    const node = new BlockchainNode(url);
    nodes.push(node);
  });

  res.json(nodes);
});

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

app.get('/blockchain', (req, res) => {
  res.json(blockchain);
});
*/
app.use('/blockchain', blockchainRoute);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
