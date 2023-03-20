import { db } from '@/database';
import { IOrder } from '@/interfaces';
import { Order, Product } from '@/models';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
type Data = { message: string } | IOrder;
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'POST':
      return createOrder(req, res);
    default:
      return res.status(400).json({ message: 'Bad Request' });
  }
}

const createOrder = async (req: NextApiRequest, res: NextApiResponse) => {
  const { orderItems, total } = req.body as IOrder;
  //Verify user authentication
  const session: any = await getSession({ req });
  if (!session) {
    return res
      .status(401)
      .json({ message: 'You have to be logged in to create an order.' });
  }
  const productsIds = orderItems.map(product => product._id);
  await db.connect();
  const dbProducts = await Product.find({ _id: { $in: productsIds } });

  try {
    const subTotal = orderItems.reduce((prev, current) => {
      const currentPrice = dbProducts.find(
        product => product.id === current._id
      )?.price;

      if (!currentPrice) {
        throw new Error('Verify the cart again, this product does not exist.');
      }

      return currentPrice * current.quantity + prev;
    }, 0);

    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);

    const backendTotal = subTotal * (taxRate + 1);

    if (total !== backendTotal) {
      throw new Error('The total is not the same as in the backend.');
    }
    const userId = session.user._id;

    const newOrder = new Order({ ...req.body, isPaid: false, user: userId });

    await newOrder.save();

    return res.status(201).json(newOrder);
  } catch (error: any) {
    await db.disconnect();
    console.log(error);
    return res
      .status(400)
      .json({ message: error.message || 'Check logs in the server' });
  }
};
