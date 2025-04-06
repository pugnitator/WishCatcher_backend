import User from "../db_models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import { filterUserData } from "../utils/userUtils.js";

class UserController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: "Ошибка валидации", errors: errors });
      }

      const { login, password } = req.body;
      const candidate = await User.findOne({ login });

      if (candidate) {
        return res
          .status(400)
          .json({ message: "Пользователь с таким логином уже существует" });
      }
      const hashPassword = bcrypt.hashSync(password, 6);
      const newUser = new User({ login, password: hashPassword });
      await newUser.save();

      return res.json({ message: "Регистрация прошла успешно" });
    } catch (e) {
      res.status(500).json({ message: "Ошибка сервера", error: e });
    }
  }

  async login(req, res) {
    try {
      const { login, password } = req.body;
      const user = await User.findOne({ login });
      if (!user) {
        return res
          .status(400)
          .json({ message: `Пользователь ${login} не найден` });
      }

      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: "Пароль введён неверно" });
      }

      console.log("userId", user._id);

      const token = generateAccessToken(user._id);
      return res.json({ token, user });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: 'Ошибка на сервере' });
    }
  }

  async getUser(req, res) {
    console.log("---GET USER---", "параметр", req);

    try {
      const userId = req.params.id || req.user.userId;
      console.log(userId);

      const user = await User.findById(userId);
      console.log("полученный user", user);

      if (!user) {
        console.error(`Пользователь с id ${userId} не найден`);
        return res.status(404).json({ message: "Пользователь не найден" });
      }

      const response = filterUserData(user);

      return res.json(response);
    } catch (e) {
      console.error("Ошибка при получении пользователя:", e);
      res.status(500).json({ message: "Ошибка сервера", error: e });
    }
  }

  async getUsersFriends(req, res) {
    console.log("Друзья", req.user);
    try {
      const { userId } = req.user;
      const user = await User.findById(userId).populate("friends");

      if (!user) {
        return res.status(400).json({ message: "Пользователь не найден" });
      }

      const formatedFriends = user.friends.map((friend) => ({
        id: friend._id,
        name: friend.name,
        login: friend.login,
        birthday: friend.birthday,
      }));

      return res.json(formatedFriends);
      // return res.json(user.friends);
    } catch (e) {
      console.error("Ошибка при получении друзей пользователя:", e);
      res.status(500).json({ message: "Ошибка сервера", error: e });
    }
  }

  async deleteFriend(req, res) {
    const userId = req.user.userId;
    const friendId = req.params.id;

    if (!friendId)
      return res.status(400).json({ message: "id друга не определен" });

    try {
      await User.updateOne({ _id: userId }, { $pull: { friends: friendId } });
      return res.json({ message: "Бывший друг удалён" });
    } catch (e) {
      res.status(400).json({ message: "Ошибка удаления друга", error: e });
    }
  }

  async updateUser(req, res) {

    try {
      const { userId } = req.user;
      const { login, name, birthday, friends } = req.body;

      console.log("---ДАННЫЕ ЮЗЕРА ИЗ БОДИ---", login, name);

      const user = await User.findByIdAndUpdate(
        userId,
        { login, name, birthday, friends },
        { new: true, runValidators: true }
      );

      if (!user) {
        return res
          .status(400)
          .json({ message: `Пользователь ${id} не найден` });
      }

      return res.json({
        message: "Данные успешно обновлены",
        user: filterUserData(user),
      });
    } catch (e) {
      res.status(500).json({ message: "Ошибка сервера", error: e.message });
    }
  }
}

const generateAccessToken = (userId) => {
  const payload = {
    userId,
  };
  if (!process.env.SECRET) {
    throw new Error("SECRET is not defined");
  }
  const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "24h" });
  console.log(token);

  return token;
};

export default new UserController();
