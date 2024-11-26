import { Router, Request, Response } from 'express';
import { filterOrdersByCustomField } from '../service';
import { OrderPagedQueryResponse } from '@commercetools/platform-sdk';

const serviceRouter = Router();

serviceRouter.use('/', async (req: Request, res: Response) => {
  try {
    const { searchTerm, limit } = req.body;
    const orders: OrderPagedQueryResponse = await filterOrdersByCustomField(searchTerm, limit);
    res.status(200).send(orders);
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
});

export default serviceRouter;
