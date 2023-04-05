import { db } from '@/database';
import { IProduct } from '@/interfaces';
import { Product } from '@/models';
import type { NextApiRequest, NextApiResponse } from 'next';
type Data = { message: string } | IProduct[];
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'GET':
      return getProducts(req, res);
    case 'POST':
      //return createProduct(req,res)
      break;
    case 'PUT':
      //return updateProduct(req,res)
      break;
    default:
      return res.status(400).json({ message: 'Bad Request' });
  }
}
async function getProducts(req: NextApiRequest, res: NextApiResponse<Data>) {
  await db.connect();
  const products = await Product.find().sort({ title: 'asc' }).lean();
  await db.disconnect();

  res.status(200).json(products);
}

async function createProduct(req: NextApiRequest, res: NextApiResponse<Data>) {
  throw new Error('Function not implemented.');
}

async function updateProduct(req: NextApiRequest, res: NextApiResponse<Data>) {
  throw new Error('Function not implemented.');
}
