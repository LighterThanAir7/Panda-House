import { useEffect, useState } from "react";
import Header from "../components/Header.jsx";
import Strengths from "../components/Strengths.jsx";
import Map from "../components/Map.jsx";
import Footer from "../components/Footer.jsx";
import Banner from "../components/Banner.jsx";
import ListGlavneKategorije from "../components/ListGlavneKategorije.jsx";
import ListPodkategorije from "../components/ListPodkategorije.jsx";
import ListMenuItems from "../components/ListMenuItems.jsx";
import {Helmet} from "react-helmet";

// Pristupanje varijablama iz .env datoteke
const PORT = import.meta.env.VITE_PORT;
const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function Jelovnik() {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSubcategory, setActiveSubcategory] = useState(null);

  useEffect(() => {
    // Fetch all categories
    fetchCategories();
  }, []);

  useEffect(() => {
    if (activeCategory) {
      fetchSubcategories(activeCategory);
      fetchProducts(activeCategory);
    }
  }, [activeCategory]);

  useEffect(() => {
    if (activeSubcategory) {
      fetchProducts(null, activeSubcategory);
    } else if (activeCategory) {
      fetchProducts(activeCategory);
    }
  }, [activeSubcategory]);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${BASE_URL}:${PORT}/api/menu/categories`);
      const data = await response.json();
      setCategories(data);
      if (data.length > 0) {
        setActiveCategory(data[0].id);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchSubcategories = async (categoryId) => {
    try {
      const response = await fetch(`${BASE_URL}:${PORT}/api/menu/categories/${categoryId}/subcategories`);
      const data = await response.json();
      setSubcategories(data);
      setActiveSubcategory(null);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };

  const fetchProducts = async (categoryId, subcategoryId) => {
    try {
      const endpoint = subcategoryId
        ? `${BASE_URL}:${PORT}/api/menu/subcategories/${subcategoryId}/products`
        : `${BASE_URL}:${PORT}/api/menu/categories/${categoryId}/products`;
      const response = await fetch(endpoint);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
    setActiveSubcategory(null);
  };

  const handleSubcategoryClick = (subcategoryId) => {
    setActiveSubcategory(subcategoryId === activeSubcategory ? null : subcategoryId);
  };

  const handleClearSubcategory = () => {
    setActiveSubcategory(null);
  };

  return (
    <>
      <Helmet>
        <title>Jelovnik</title>
      </Helmet>
      <Header />

      <Banner title="Naš izbor jela">
        Otkrijte okuse Dalekog Istoka s našim autentičnim kineskim jelima. Svaki zalogaj je putovanje kroz bogatu povijest i tradiciju kineske kuhinje, pripremljen s ljubavlju i pažnjom naših majstora kuhara.
      </Banner>

      <section className="menu-tabbing container mx-auto py-150">
        <ListGlavneKategorije
          categories={categories}
          activeCategory={activeCategory}
          handleCategoryClick={handleCategoryClick}
        />

        {subcategories.length > 0 && (
          <ListPodkategorije
            subcategories={subcategories}
            activeSubcategory={activeSubcategory}
            handleSubcategoryClick={handleSubcategoryClick}
            handleClearSubcategory={handleClearSubcategory}
          />
        )}

        <ListMenuItems products={products} />
      </section>

      <Strengths />
      <Map />
      <Footer />
    </>
  );
}
