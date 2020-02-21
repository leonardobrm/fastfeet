import { Router } from 'express';

import User from './app/models/User';

const routes = new Router();

routes.get('/users', async (req, res) => {
  const user = await User.create({
    name: 'Leonardo Brasil',
    email: 'leonardo.brasil59@outlook.com',
    password_hash: '123abc',
  });

  return res.json(user);
});

export default routes;
