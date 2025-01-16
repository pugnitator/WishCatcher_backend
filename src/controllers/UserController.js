import User from "../db_models/User.js";

class UserController {
    async createUser(req, res) {
        try {
            const {login, password, name, birthday, friends} = req.body;
            const newUser = await User.create({login, password, name, birthday, friends});
            res.json(newUser);
        } catch(e) {
            res.status(500).json(e);
        }
    }

    async getUser(req, res) {
        try {
            const {id: userId} = req.params;
            const user = await User.findById(userId);
            res.json(user);
        }catch(e){
            res.status(500).json(e);
        }
    }
}

export default new UserController;