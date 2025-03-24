import { Router } from "express";
import userController from "../controllers/UserController.js";
import { check } from "express-validator";
import authMiddleware from "../middleware/authMiddleware.js";

const userRouter = new Router();

console.log(userController);

userRouter.post('/registration', [
    check('login', 'Нужно указать адрес электронной почты').isEmail(),
    check('password', 'Пароль должен содержать от 4 до 20 символов включительно').isLength({min: 4, max: 20})
], userController.registration);

userRouter.post('/login', userController.login);

userRouter.put('/updateUser', [
    check('_id', 'Должен быть id MongoDB').isMongoId(),
    check('login', 'Нужно указать адрес электронной почты').isEmail(),
    check('name', 'Имя должно содержать от 1 до 20 символов включительно').isLength({min: 1, max: 20}),
    check('birthday', 'Дата должна быть в формате YYYY-MM-DD или YYYY-MM-DDTHH:mm:ss.sssZ').isDate()
], authMiddleware, userController.updateUser);

userRouter.get('/me', authMiddleware, userController.getUser);  // Получить данные текущего пользователя

//_______________

userRouter.get('/:id/wishList');  // Получить список пожеланий пользователя
userRouter.get('/:id/reservedWishes');  // Получить список забронированных пользователем подарков
userRouter.get('/:id/friends');  // Получить список друзей пользователя

userRouter.post('/:id/friends');  // Добавить друга в список друзей

userRouter.put('/:id');  // Изменить данные пользователя

userRouter.delete('/:id');  // Удалить пользователя
userRouter.delete('/:id/friends/:friendId');  // Удалить друга

export default userRouter;