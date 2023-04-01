import { db } from '@/database';
import { Order, Product, User } from '@/models';
import type { NextApiRequest, NextApiResponse } from 'next';
type Data = {
  numberOfOrders: number;
  paidOrders: number; //isPaid true
  notPaidOrders: number;
  numberOfClients: number; // role: client
  numberOfProducts: number;
  productWithNoInventory: number; // 0
  lowInvetory: number; // < 1o
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await db.connect();

  const [
    numberOfOrders,
    paidOrders,
    numberOfClients,
    numberOfProducts,
    productWithNoInventory,
    lowInvetory,
  ] = await Promise.all([
    await Order.count(),
    await Order.find({ isPaid: true }).count(),
    await User.find({ role: 'client' }).count(),
    await Product.count(),
    await Product.find({ inStock: 0 }).count(),
    await Product.find({ inStock: { $lte: 10 } }).count(),
  ]);

  await db.disconnect();

  res.status(200).json({
    numberOfOrders,
    paidOrders,
    numberOfClients,
    numberOfProducts,
    productWithNoInventory,
    lowInvetory,
    notPaidOrders: numberOfOrders - paidOrders,
  });
}
