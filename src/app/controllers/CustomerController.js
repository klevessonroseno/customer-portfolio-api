import Customer from '../models/Customer';
import * as Yup from 'yup';

class CustomerController {
  async store(req, res) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().email().required(),
        age: Yup.number().required(),
    });

    if(!(await schema.isValid(req.body))) return res.status(400).json({
        error: 'Validation Fails',
    });

    const { name, email, age } = req.body;
    const { userId, firstName } = req;

    if(!userId) return res.status(400).json({
      message: 'User id is required.',
    });

    const customerExists = await Customer.findOne({
      where: { 
        email,
        user_id: userId,
      },
    });

    if(customerExists) return res.status(400).json({
      message: `${firstName}, you have already registered a customer with this email.`,
    });

    const customerCreated = await Customer.create({
      name,
      email,
      age,
      user_id: userId,
    });

    if(customerCreated) return res.status(200).json({
      message: `${firstName}, you registered a new customer.`,
    });

    } catch (error) {
      res.status(500).json({
        message: 'Something went wrong.',
      });
    }
  }

  async update(req, res){
    try {
      const schema = Yup.object().shape({
        id: Yup.number().required(),
        name: Yup.string(),
        email: Yup.string().email(),
        age: Yup.number(),              
      });  

      if(!(await schema.isValid(req.body))) return res.status(400).json({
        error: 'Validation Fails',
      });

      const { id, email } = req.body;
      const customer = await Customer.findByPk(id);
      
      if(!customer) return res.status(400).json({
        message: 'Customer does not exist',
      });

      if(email && email !== customer.email) {
        const customerExists = await Customer.findOne({
          where: { email },
        });

        if(customerExists) return res.status(400).json({
          message: 'There is already a customer registered with this email.',
        });
      }

      await Customer.update(req.body, {
        where: { id },
      });

      res.status(204).json();

    } catch (error) {
      res.status(500).json({
        message: 'Something went wrong.',
      });
    }
  }

  async getOneById(req, res){
    try {
      const { id } = req.params;
      const customer = await Customer.findByPk(id);

      if(!customer) return res.status(404).json({
        message: 'Customer not found.', 
      });

      res.status(200).json(customer);
    } catch (error) {
      res.status(500).json({
        message: 'Something went wrong.',
      });
    }
  }

  async getOneByEmail(req, res){
    try {
      const schema = await Yup.object().shape({
        email: Yup.string().email().required(),
      });

      if(!(await schema.isValid(req.body))) return res.status(400).json({
        message: 'Email is required.',
      });

      const customer = await Customer.findOne({
        where: { 
          email: req.body.email,
        },
      });

      if(!customer) return res.status(404).json({
        message: 'There is no customer registered with this email.',
      });
      
      const { name, email, age } = customer;
      
      res.status(200).json({
        name,
        email,
        age,
      });

    } catch (error) {
      res.status(500).json({
        message: 'Something went wrong.',
      });
    }
  }

  async getAll(req, res){
    try {
      const { userId } = req;
      let customers = await Customer.findAll({
        where: {
          user_id: userId,
        },
      });

      customers = customers.map(({
        id,
        name,
        email,
      }) => {
        return ({
          id,
          name,
          email,
        });
      });

      res.status(200).json(customers);

    } catch (error) {
      
      res.status(500).json({
        message: 'Something went wrong.',
      });
    }
  }
}

export default new CustomerController();