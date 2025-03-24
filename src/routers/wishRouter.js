import { Router } from "express";
import WishController from "../controllers/WishController.js";

const wishRouter = new Router();

// Создать пожелание
wishRouter.post('/', WishController.createWish);

wishRouter.get('/:id');  // Получить конкретное пожелание

wishRouter.put('/:id');  // Изменить пожелание
wishRouter.put('/:id/reserve'); // Забронировать пожелание
wishRouter.put('/:id/unreserve'); // Отменить бронирование

wishRouter.delete('/:id');  // Удалить пожелание

export default wishRouter;