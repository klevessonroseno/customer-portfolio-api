import { Router } from 'express';
import Customer from '../models/Customer';

const customers = [];
const routes = new Router();

routes.get('/customers', (req, res) => res.status(200).json(customers));

routes.post('/customers', (req, res) => {
    const { name, age } = req.body;
    const customer = new Customer(name, age);
    
    customers.push(customer);

    return res.status(201).json({
        message: 'Customer created',
        customerData: { name, age } 
    });
});

export default routes;