import { getProductsByIdsModel } from '../models/cartModel.js';

export const getCartProducts = async (req, res) => {
  const { ids } = req.body;
  try {
    const products = await getProductsByIdsModel(ids);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};