import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { db } from '@/database';
import { User } from '@/models';
import { jwt, validations } from '@/utils';
type Data =
  | { message: string }
  | { token: string; user: { email: string; name: string; role: string } };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'POST':
      return registerUser(req, res);
    default:
      res.status(400).json({
        message: 'Bad request',
      });
  }
}

const registerUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    email = '',
    password = '',
    name = '',
  } = req.body as { email: string; password: string; name: string };

  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: 'Password must be at least 6 characters' });
  }
  if (name.length < 3) {
    return res
      .status(400)
      .json({ message: 'Name must be at least 3 characters' });
  }
  if (!validations.isValidEmail(email)) {
    return res.status(400).json({ message: 'Email is not valid' });
  }

  await db.connect();
  const user = await User.findOne({ email });
  if (user) {
    await db.disconnect();
    return res.status(400).json({ message: 'This email is already in use' });
  }
  const newUser = new User({
    name,
    email: email.toLowerCase(),
    password: bcrypt.hashSync(password),
    role: 'client',
  });
  try {
    await newUser.save({ validateBeforeSave: true });
  } catch (error) {
    return res.status(500).json({ message: 'Contact with an administrator' });
  }
  const { _id, role } = newUser;
  const token = jwt.signToken(_id, email);
  return res.status(200).json({
    token,
    user: {
      email,
      role,
      name,
    },
  });
};
