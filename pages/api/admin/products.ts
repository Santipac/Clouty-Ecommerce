import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/database';
import { IProduct } from '@/interfaces';
import { Product } from '@/models';
import { isValidObjectId } from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';
cloudinary.config(process.env.CLOUDINARY_URL || '');
type Data = { message: string } | IProduct[] | IProduct;
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'GET':
      return getProducts(req, res);
    case 'PUT':
      return updateProduct(req, res);
    case 'POST':
      return createProduct(req, res);

    default:
      return res.status(400).json({ message: 'Bad Request' });
  }
}
async function getProducts(req: NextApiRequest, res: NextApiResponse<Data>) {
  await db.connect();
  const products = await Product.find().sort({ title: 'asc' }).lean();
  await db.disconnect();

  const updatedProducts = products.map(product => {
    product.images = product.images.map(image => {
      return image.includes('http')
        ? image
        : `${process.env.HOST_NAME}products/${image}`;
    });
    return product;
  });

  res.status(200).json(updatedProducts);
}

async function updateProduct(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { _id = '', images = [] } = req.body as IProduct;

  if (!isValidObjectId(_id)) {
    return res.status(400).json({ message: "Product's ID isn't valid" });
  }
  if (images.length < 2) {
    return res.status(400).json({ message: 'You must have 2 images' });
  }

  try {
    await db.connect();
    const product = await Product.findById(_id);
    if (!product) {
      await db.disconnect();
      return res
        .status(400)
        .json({ message: 'Does not exists any product with that ID.' });
    }

    product.images.forEach(async image => {
      if (!images.includes(image)) {
        const [fileId, extension] = image
          .substring(image.lastIndexOf('/') + 1)
          .split('.');
        await cloudinary.uploader.destroy(fileId);
      }
    });

    await product.updateOne(req.body);
    await db.disconnect();
    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    await db.disconnect();
    return res
      .status(400)
      .json({ message: "Something went wrong, check the server's console" });
  }
}

async function createProduct(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { images = [] } = req.body as IProduct;
  if (images.length < 2)
    return res.status(400).json({ message: 'You must have 2 images' });

  try {
    await db.connect();

    const productInDB = await Product.findOne({ slug: req.body.slug });

    if (productInDB) {
      await db.disconnect();
      return res
        .status(400)
        .json({ message: 'A product already exists with this slug' });
    }

    const product = new Product(req.body);
    await product.save();
    await db.disconnect();
    return res.status(201).json(product);
  } catch (error) {
    await db.disconnect();
    return res.status(400).json({ message: 'Check server logs' });
  }
}
