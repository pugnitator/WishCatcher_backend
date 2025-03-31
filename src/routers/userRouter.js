import { Router } from "express";
import userController from "../controllers/UserController.js";
import { check } from "express-validator";
import authMiddleware from "../middleware/authMiddleware.js";
import WishController from "../controllers/WishController.js";

const userRouter = new Router();

// без авторизации
userRouter.post('/registration', [
    check('login', 'Нужно указать адрес электронной почты').isEmail(),
    check('password', 'Пароль должен содержать от 4 до 20 символов включительно').isLength({min: 4, max: 20})
], userController.registration);

userRouter.post('/login', userController.login);

// TODO: тут просмотр списка по сгенерированной ссылке 


// только для авторизованных
userRouter.get('/me', authMiddleware, userController.getUser);  // Получить данные текущего пользователя (по токену)

userRouter.put('/updateUser', [
    check('_id', 'Должен быть id MongoDB').isMongoId(),
    check('login', 'Нужно указать адрес электронной почты').isEmail(),
    check('name', 'Имя должно содержать от 1 до 20 символов включительно').isLength({min: 1, max: 20}),
    check('birthday', 'Дата должна быть в формате YYYY-MM-DD или YYYY-MM-DDTHH:mm:ss.sssZ').isDate()
], authMiddleware, userController.updateUser);



userRouter.get('/:id/reservedWishes');  // Получить список забронированных пользователем подарков
userRouter.get('/:id/friends');  // Получить список друзей пользователя

userRouter.post('/:id/friends');  // Добавить друга в список друзей

userRouter.put('/:id');  // Изменить данные пользователя

userRouter.delete('/:id');  // Удалить пользователя
userRouter.delete('/:id/friends/:friendId');  // Удалить друга

export default userRouter;