import { Router } from "express";
import WishController from "../controllers/WishController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const wishRouter = new Router();
//без авторизации


//только с авторизацией
wishRouter.post('/create', authMiddleware, WishController.createWish); // Создать пожелание
wishRouter.get('/list/:id', authMiddleware, WishController.getWishesByUser); //получить список
wishRouter.delete('/:id', authMiddleware, WishController.deleteWish); // Удалить пожедание

// wishRouter.get('/:id');  // Получить конкретное пожелание
// wishRouter.put('/:id');  // Изменить пожелание
// wishRouter.put('/:id/reserve'); // Забронировать пожелание
// wishRouter.put('/:id/unreserve'); // Отменить бронирование

export default wishRouter;