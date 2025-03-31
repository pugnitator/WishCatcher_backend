import { Router } from "express";
import WishController from "../controllers/WishController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const wishRouter = new Router();

// Создать пожелание
wishRouter.post('/create', authMiddleware, WishController.createWish);

wishRouter.get('/:id');  // Получить конкретное пожелание

wishRouter.get('/myWishes', authMiddleware, WishController.getWishesByUser);  // Получить список своих пожеланий пользователя

wishRouter.put('/:id');  // Изменить пожелание
wishRouter.put('/:id/reserve'); // Забронировать пожелание
wishRouter.put('/:id/unreserve'); // Отменить бронирование

wishRouter.delete('/:id');  // Удалить пожелание

export default wishRouter;