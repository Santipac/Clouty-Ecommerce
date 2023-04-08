import { db, SHOP_CONSTANTS } from '@/database';
import { IProduct } from '@/interfaces';
import { Product } from '@/models';
import type { NextApiRequest, NextApiResponse } from 'next';
type Data = { message: string } | IProduct[];
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'GET':
      return getProducts(req, res);
    default:
      return res.status(400).json({ message: 'Bad Request' });
  }
}
const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { gender = 'all', type = 'all', price = 'default' } = req.query;
  let condition = {};
  if (gender !== 'all' && SHOP_CONSTANTS.validGenders.includes(`${gender}`)) {
    condition = { gender };
  }
  if (type !== 'all') {
    condition = { ...condition, type };
  }

  await db.connect();
  const products = await Product.find(condition)
    .select('title images price inStock slug -_id')
    .lean();
  await db.disconnect();

  if (price !== 'default') {
    price === 'cheap'
      ? products.sort((a, b) => a.price - b.price)
      : products.sort((a, b) => b.price - a.price);
  }

  const updatedProducts = products.map(product => {
    product.images = product.images.map(image => {
      return image.includes('http')
        ? image
        : `${process.env.HOST_NAME}products/${image}`;
    });
    return product;
  });
  return res.status(200).json(updatedProducts);
};
