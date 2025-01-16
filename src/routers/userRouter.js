import { Router } from "express";
import userController from "../controllers/userController.js";

const userRouter = new Router();

// Зарегистрировать нового пользователя
userRouter.post('/register', userController.createUser);

userRouter.get('/:id', userController.getUser);  // Получить данные пользователя
userRouter.get('/:id/wishList');  // Получить список пожеланий пользователя
userRouter.get('/:id/reservedWishes');  // Получить список забронированных пользователем подарков
userRouter.get('/:id/friends');  // Получить список друзей пользователя

userRouter.post('/:id/friends');  // Добавить друга в список друзей

userRouter.put('/:id');  // Изменить данные пользователя

userRouter.delete('/:id');  // Удалить пользователя
userRouter.delete('/:id/friends/:friendId');  // Удалить друга

export default userRouter;