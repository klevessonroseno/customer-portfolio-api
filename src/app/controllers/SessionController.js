import jwt from 'jsonwebtoken';
import User from '../models/User';
import authConfig from '../../config/auth';
import * as Yup from 'yup';

class SessionController {
  async store(req, res) {
    try {
      const schema = Yup.object().shape({
        email: Yup.string().email().required(),
        password: Yup.string().required(),
      });

      if(!(await schema.isValid(req.body))){
        return res.status(400).json({
          message: 'Email and password are required.'
        });
      }

      const { email, password } = req.body;

      const user = await User.findOne({
        where: { email },
      });

      if(!user) return res.status(404).json({
        message: 'Email not registered.',
      });
      
      if(!(await user.checkPassword(password))){
        return res.status(401).json({
          message: 'Incorrect password.',
        });
      }

      const { id, name } = user;

      const [ firstName ] = name.split(' '); 

      res.status(200).json({
        token: jwt.sign(
          {
            id,
            firstName
          },
          authConfig.secret,
          {
            expiresIn: authConfig.expiresIn,
          }
        )
      });

    } catch (error) {
      res.status(500).json({
        message: 'Something went wrong.'
      });
    }
  }
}

export default new SessionController();