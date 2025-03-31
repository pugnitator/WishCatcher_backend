import Wish from "../db_models/Wish.js";

class WishController {
  async createWish(req, res) {
    try {
      const { name, giftURL, comment } = req.body;

      console.log('reqUser', req.user, req.user.userId);
      const ownerId = req.user.userId;

      console.log('ownerId', ownerId);

      const wish = new Wish({
        name,
        giftURL,
        comment,
        ownerId,
      });

      await wish.save();

      return res.json({ message: "Пожелание успешно создано" });
    } catch (e) {
      console.error(e);
      res.status(400).json({ message: "Ошибка создания виша", error: e });
    }
  }

  async getWish(req, res) {
    try {
      const { id: wishId } = req.params;
      const wish = await Wish.findById(wishId);
      return res.json(wish);
    } catch (e) {
      res.status(400).json({ message: "Ошибка получения виша", error: e });
    }
  }

  async getMyWishes(req, res) {
    try {
      const { userId } = req.user;
      console.log(userId);

      const wishes = await Wish.find({ ownerId: userId });
      return res.json(wishes);
    } catch (e) {
      res
        .status(400)
        .json({ message: "Ошибка получения списка вишей", error: e });
    }
  }

  async getWishesByUser(req, res) {
    console.log(req.user)
    try {
      const { userId } = req.user;
      console.log(userId);

      const wishes = await Wish.find({
        ownerId: userId,
      });
      return res.json(wishes);
    } catch (e) {
      res
        .status(400)
        .json({ message: "Ошибка получения списка вишей", error: e });
    }
  }
}

export default new WishController();
