import User from '../models/User';

class UserController{
    async store(req, res){
        try {
            return res.status(201).json(await User.create(req.body));
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}

export default new UserController();
