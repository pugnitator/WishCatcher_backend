import Wish from "../db_models/Wish.js";

class WishController {
  async createWish(req, res) {
    try {
      const { name, giftURL, comment } = req.body;

      console.log("reqUser", req.user, req.user.userId);
      const ownerId = req.user.userId;

      console.log("ownerId", ownerId);

      const wish = new Wish({
        name,
        giftURL,
        comment,
        ownerId,
      });

      await wish.save();

      return res.json({
        message: "Пожелание успешно создано",
        wish: wish,
      });
    } catch (e) {
      console.error(e);
      res.status(400).json({ message: "Ошибка создания виша", error: e });
    }
  }

  async deleteWish(req, res) {
    console.log(req.params.id);
    try {
      await Wish.findByIdAndDelete(req.params.id);
      return res.json({ message: "Виш удалён" });
    } catch (e) {
      res.status(400).json({ message: "Ошибка удаления виша", error: e });
    }
  }

  async getWishesByUser(req, res) {
    // console.log("--- ПОЛУЧАЮ СПИСОК ---", req.user, req.params.id);
    try {
      const userId = req.params.id === "me" ? req.user.userId : req.params.id;
      console.log(userId);

      const wishes = await Wish.find({
        ownerId: userId,
      }).lean();

      const modifiedWishes = wishes.map((wish) => ({
        ...wish,
        id: wish._id,
        _id: undefined,
      }));
      // console.log('САМ СПИСОК: ', modifiedWishes);

      return res.json(modifiedWishes);
    } catch (e) {
      res
        .status(400)
        .json({ message: "Ошибка получения списка вишей", error: e });
    }
  }
}

export default new WishController();
