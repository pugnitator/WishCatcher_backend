import { Router } from "express";
import userController from "../controllers/UserController.js";
import { check } from "express-validator";
import authMiddleware from "../middleware/authMiddleware.js";

const userRouter = new Router();

// без авторизации
userRouter.post("/registration",
  [
    check("login", "Нужно указать адрес электронной почты").isEmail(),
    check(
      "password",
      "Пароль должен содержать от 4 до 20 символов включительно"
    ).isLength({ min: 4, max: 20 }),
  ],
  userController.registration
);
userRouter.post("/login", userController.login);

// TODO: тут просмотр списка по сгенерированной ссылке

// только для авторизованных
userRouter.get("/me", authMiddleware, userController.getUser); // Получить данные текущего пользователя (по токену)
userRouter.get("/friends", authMiddleware, userController.getUsersFriends); // Получить друзей текущего пользователя (по токену)
userRouter.get('/friend/:id', authMiddleware, userController.getUser); // Получать данные пользователя
userRouter.put("/updateUser",
  [
    check("login", "Нужно указать адрес электронной почты").isEmail(),
    check("name")
      .optional()
      .isLength({ min: 1, max: 100 })
      .withMessage("Имя должно содержать от 1 до 20 символов включительно"),
    check("birthday")
      .optional()
      .isDate()
      .withMessage(
        "Дата должна быть в формате YYYY-MM-DD или YYYY-MM-DDTHH:mm:ss.sssZ"),
  ],
  authMiddleware,
  userController.updateUser
);

userRouter.delete("/deleteFriend/:id", authMiddleware, userController.deleteFriend); // Удалить друга

export default userRouter;
