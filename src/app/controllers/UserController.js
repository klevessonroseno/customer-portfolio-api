import User from '../models/User';
import * as Yup from 'yup';

class UserController{
    async store(req, res){
        try {
            const schema = Yup.object().shape({
                name: Yup.string().required(),
                email: Yup.string().email().required(),
                password: Yup.string().required().min(6),
            });

            if(!(await schema.isValid(req.body))) return res.status(400).json({
                error: 'Validation Fails',
            });
            
            const userExists = await User.findOne({
                where: { 
                    email: req.body.email
                },
            });

            if(userExists) return res.status(400).json({
                message: 'E-mail already registered.'
            });
            
            const { name, email } = await User.create(req.body);
            
            return res.status(201).json({ name, email });

        } catch (error) {
            return res.status(500).json(error);
        }
    }

    async update(req, res){
        try {
            const schema = Yup.object().shape({
                name: Yup.string(),
                email: Yup.string().email(),
                oldPassword: Yup.string().min(6),
                password: Yup.string().min(6).when('oldPassword', 
                    (oldPassword, field) => {
                        return oldPassword 
                            ? field.required() 
                            : field
                    }
                ),
                confirmPassword: Yup.string().when('password', 
                    (password, field) => {
                        return password 
                            ? field.required().oneOf([Yup.ref('password')]) 
                            : field
                    }
                ),                
            });

            if(!(await schema.isValid(req.body))) return res.status(400).json({
                error: 'Validation Fails'
            });
            
            const { email, oldPassword } = req.body;
    
            const user = await User.findByPk(req.userId);
    
            if(email && email !== user.email) {
                const userExists = await User.findOne({
                    where: { email },
                });
    
                if(userExists) return res.status(400).json({
                    message: 'Email already registered by another user.',
                });
            }
    
            if(oldPassword && !(await user.checkPassword(oldPassword))){
                return res.status(401).json({
                    message: 'Incorrect password.',
                });
            }
    
            const userUpdated = await user.update(req.body);
            const userFound = await User.findByPk(req.userId);
    
            return res.status(200).json({ userUpdated, userFound });      

        } catch (error) {
            res.status(500).json({
                message: 'Something went wrong.'
            });
        }  
    }
}

export default new UserController();
