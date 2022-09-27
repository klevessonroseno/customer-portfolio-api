import { Router } from 'express';
import UserController from '../app/controllers/UserController';
import SessionController from '../app/controllers/SessionController';
import CustomerController from '../app/controllers/CustomerController';
import authMiddleware from '../app/middlewares/auth';

const routes = new Router();

// Public Routes 
routes.post('/users', UserController.store);

routes.post('/sessions', SessionController.store);

// Private Routes
routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.post('/users/customers', CustomerController.store);

routes.put('/users/customers', CustomerController.update);

routes.get('/users/customer', CustomerController.getOneByEmail);

export default routes;