import { Router } from 'express';

const routes = new Router();

routes.get('/users', (req, res) => res.json({ message: 'hello word' }));

export default routes;
