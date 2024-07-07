import {
  getCategoriesModel,
  getProductsByCategoryId,
  getProductsBySubcategoryId,
  getSubcategoriesByCategoryId
} from '../models/categoryModel.js';

export const getCategories = async (req, res) => {
  try {
    const categories = await getCategoriesModel();
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Greška prilikom dohvaćanja kategorija' });
  }
};

export const getSubcategories = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const subcategories = await getSubcategoriesByCategoryId(categoryId);
    res.json(subcategories);
  } catch (error) {
    console.error('Error fetching subcategories:', error);
    res.status(500).json({ error: 'Greška prilikom dohvaćanja podkategorija' });
  }
};

export const getProductsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const products = await getProductsByCategoryId(categoryId);
    res.json(products);
  } catch (error) {
    console.error('Error fetching products by category:', error);
    res.status(500).json({ error: 'Greška prilikom dohvaćanja proizvoda' });
  }
};

export const getProductsBySubcategory = async (req, res) => {
  try {
    const { subcategoryId } = req.params;
    const products = await getProductsBySubcategoryId(subcategoryId);
    res.json(products);
  } catch (error) {
    console.error('Error fetching products by subcategory:', error);
    res.status(500).json({ error: 'Greška prilikom dohvaćanja proizvoda' });
  }
};