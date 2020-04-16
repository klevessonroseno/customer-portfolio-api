import { Router } from 'express';

const routes = new Router();

routes.get('/test', (req, res) => res.status(200).json({
    message: 'Tudo ok'
}));

export default routes;