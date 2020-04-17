import { Router } from 'express';
import Customer from '../models/Customer';
import Purchase from '../models/Purchase';

const customers = [];
const routes = new Router();

routes.get('/customers', (req, res) => res.status(200).json(customers));

routes.post('/customers', (req, res) => {
    const { name, age } = req.body;

    const id = customers.push(new Customer(name, age));

    customers[id - 1].id = id.toString();

    return res.status(201).json({
        message: 'Customer created',
        customerData: customers[id - 1] 
    });
});

routes.get('/customers/:id', (req, res) => {
    const { id } = req.params;

    const customer = customers.find(customer => {
        return customer.id === id;
    });

    return res.status(200).json(customer);
});

routes.put('/customers/:id', (req, res) => {
    const { name, age } = req.body;
    const { id } = req.params;

    const customerId = customers.findIndex(customer => {
        return customer.id === id;
    });

    customers[customerId] = new Customer(name, age);
    customers[customerId].id = id;

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
    
    const customerId = customers.findIndex(customer => {
        return customer.id === id;
    });
    const purchaseId = customers[customerId].purchases.push(
        new Purchase(name, price)
    );
    customers[customerId].purchases[purchaseId - 1].id = purchaseId.toString();   

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

routes.put('/customers/:customer_id/purchases/:purchase_id', (req, res) => {
    const { customer_id, purchase_id } = req.params;
    const { name, price } = req.body;

    const customerIndex = customers.findIndex(customer => {
        return customer.id === customer_id;
    });
    const purchases = customers[customerIndex].purchases;

    const purchaseIndex = purchases.findIndex(purchase => {
        return purchase.id === purchase_id;
    });

    purchases[purchaseIndex] = new Purchase(name, price);
    purchases[purchaseIndex].id = purchase_id;

    res.status(200).json({
        message: 'Purchase updated',
        purchaseData: purchases[purchaseIndex]
    });
});

export default routes;