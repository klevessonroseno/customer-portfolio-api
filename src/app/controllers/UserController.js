import User from '../models/User';

class UserController{
    async store(req, res){
        try {
            const { name, email, password_hash } = req.body;
            const user = await User.create({ name, email, password_hash });
            
            return res.status(201).json(user);
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}

export default new UserController();
