import { db, dbProducts } from '@/database';
import { IPaypal } from '@/interfaces';
import { Order, Product } from '@/models';
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
type Data = { message: string };
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'POST':
      return payOrder(req, res);
    default:
      return res.status(400).json({ message: 'Bad Request' });
  }
}

const getPaypalBearerToken = async (): Promise<string | null> => {
  const PAYPAL_CLIENT = process.env.NEXT_PUBLIC_PAYPAL_CLIENT;
  const PAYPAL_SECRET = process.env.PAYPAL_SECRET;

  const base64Token = Buffer.from(
    `${PAYPAL_CLIENT}:${PAYPAL_SECRET}`,
    'utf-8'
  ).toString('base64');

  const body = new URLSearchParams('grant_type=client_credentials');
  try {
    const { data } = await axios.post(
      process.env.PAYPAL_OAUTH_URL || '',
      body,
      {
        headers: {
          Authorization: `Basic ${base64Token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    return data.access_token;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data);
    } else {
      console.log(error);
    }
    return null;
  }
};

const payOrder = async (req: NextApiRequest, res: NextApiResponse) => {
  const paypalBearerToken = await getPaypalBearerToken();
  if (!paypalBearerToken) {
    return res
      .status(400)
      .json({ message: 'Paypal token could not be confirmed  ' });
  }
  const { transactionId = '', orderId = '' } = req.body;
  const { data } = await axios.get<IPaypal.PaypalOrderStatusResponse>(
    `${process.env.PAYPAL_ORDERS_URL}/${transactionId}`,
    {
      headers: {
        Authorization: `Bearer ${paypalBearerToken}`,
      },
    }
  );

  if (data.status !== 'COMPLETED') {
    return res.status(401).json({ message: 'Order not recognized' });
  }
  await db.connect();
  const dbOrder = await Order.findById(orderId);

  if (!dbOrder) {
    await db.disconnect();
    return res
      .status(400)
      .json({ message: 'The Order does not exist in our database' });
  }

  if (dbOrder.total !== Number(data.purchase_units[0].amount.value)) {
    await db.disconnect();
    return res
      .status(400)
      .json({ message: 'The Paypal amounts and our order do not match.' });
  }
  dbOrder.transactionId = transactionId;
  dbOrder.isPaid = true;
  await dbOrder.save();

  const orderItems = dbOrder.orderItems;
  orderItems.map(async prod => {
    const product = await Product.findById(prod._id);
    product!.inStock -= prod.quantity;
    await product?.save();
  });
  await db.disconnect();
  return res.status(200).json({ message: 'Paid Order' });
};
