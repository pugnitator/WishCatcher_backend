import Wish from "../db_models/Wish.js";

class WishController {
  async createWish(req, res) {
    try {
      const { name, state, giftURL, comment, tags, ownerId, reservedBy } = req.body;
      const wish = new Wish({
        name,
        state,
        giftURL,
        comment,
        tags,
        ownerId,
        reservedBy,
      });
      wish.save();

      return res.json({ message: "Пожелание успешно создано" });
    } catch (e) {
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

  async getWishesByUser(req, res) {
    try {
      const { id: userId } = req.params;
      const wishes = await Wish.find({ ownerId: userId });
      return res.json(wishes);
    } catch (e) {
      res
        .status(400)
        .json({ message: "Ошибка получения списка вишей", error: e });
    }
  }
}

export default new WishController();
