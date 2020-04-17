import { Router } from 'express';
import Customer from '../models/Customer';
import Purchase from '../models/Purchase';

const customers = [];
const routes = new Router();

routes.get('/customers', (req, res) => res.status(200).json(customers));

routes.post('/customers', (req, res) => {
    const { id, name, age } = req.body;
    const customer = new Customer(id, name, age);
    
    customers.push(customer);

    return res.status(201).json({
        message: 'Customer created',
        customerData: customer 
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

routes.post('/customers/:id/purchases', (req, res) => {
    const { id } = req.params;
    const { name, price } = req.body;
    const purchase = new Purchase(name, price);
    const customerId = customers.findIndex(customer => {
        return customer.id === id;
    });
    customers[customerId].purchases.push(purchase);

    return res.status(201).json({
        message: 'Purchase created',
        purchase: customers[customerId].purchases
    });
});

routes.get('/customers/:id/purchases', (req, res) => {
    const { id } = req.params;
    const customerId = customers.findIndex(customer => {
        return customer.id === id;
    });
    const purchases = customers[customerId].purchases;

    return res.status(200).json(purchases);
});

routes.put('/customers/:id/purchases', (req, res) => {
    const { id } = req.params;
    const { name, price } = req.body;
    const customerId = customers.findIndex(customer => {
        return customer.id === id;
    });
    const purchases = customers[customerId].purchases;
    
});

export default routes;