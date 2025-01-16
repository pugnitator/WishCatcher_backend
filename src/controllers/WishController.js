import Wish from "../db_models/Wish.js";

class WishController {
  async createWish(req, res) {
    try {
      const { name, state, giftURL, comment, tags, ownerId, reservedBy } =
        req.body;
      const wish = await Wish.create({name, state, giftURL, comment, tags, ownerId, reservedBy});
      res.json(wish);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async getWish(req, res) {
    try {
      const { id: wishId } = req.params;
      const wish = await Wish.findById(wishId);
      res.json(wish);
    } catch (e) {
      res.status(500).json(e);
    }
  }
  
}

export default new WishController();
