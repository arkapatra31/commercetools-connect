import { Router, Request, Response } from 'express';
import { filterOrdersByCustomField } from '../service';
import { OrderPagedSearchResponse } from '@commercetools/platform-sdk';

const serviceRouter = Router();

serviceRouter.use('/', async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.body;
    const orders: OrderPagedSearchResponse = await filterOrdersByCustomField(searchTerm);
    res.status(200).send(orders);
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
});

export default serviceRouter;
