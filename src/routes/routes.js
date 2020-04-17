import { Router } from 'express';
import Customer from '../models/Customer';

const customers = [];
const routes = new Router();

routes.get('/customers', (req, res) => res.status(200).json(customers));

routes.post('/customers', (req, res) => {
    const { id, name, age } = req.body;
    const customer = new Customer(id, name, age);
    
    customers.push(customer);

    return res.status(201).json({
        message: 'Customer created',
        customerData: { id, name, age } 
    });
});

routes.get('/customers/:id', (req, res) => {
    const { id } = req.params;
    const customer = customers.find(customer => {
        return customer.id = id;
    });

    return res.status(200).json(customer);
});

routes.put('/customers/:id', (req, res) => {
    const { name, age } = req.body;
    const { id } = req.params;
    const customerId = customers.findIndex(customer => {
        return customer.id === id;
    });
    customers[customerId] = new Customer(id, name, age);

    return res.status(200).json({
        message: 'Customer updated',
        customerData: customers[customerId]
    });
});

routes.delete('/customers/:id', (req, res) => {
    const { id } = req.params;
    const customerId = customers.findIndex(customer => {
        return customer.id === id;
    });
    customers.splice(customerId, 1);
    return res.status(200).json({
        message: 'Customer deleted'
    });
});

export default routes;