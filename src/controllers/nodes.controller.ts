import { Request, Response } from 'express';

import '../global';

import { Node } from '../models/Node';

const create = async (req: Request, res: Response): Promise<any> => {
  try {
    const { nodeUrl } = req.body;

    const node = new Node(nodeUrl);

    if (global.nodes.find((node) => node.url === nodeUrl)) {
      return res.status(400).send({ message: 'There is already a blockchain node running at this url.' });
    }

    global.nodes.push(node);

    res.status(201).send({
      message: 'New blockchain node added.',
      data: {
        nodeUrl,
      },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unexpected error.';

    res.status(500).send({
      message: 'An error ocurred.',
      error: {
        code: 500,
        message: errorMessage,
      },
    });
  }
};

//fazer findAll

export default { create };
