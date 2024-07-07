export default function ListGlavneKategorije ({ categories, activeCategory, handleCategoryClick }) {
  return (
    <>
      <h2>Glavne Kategorije</h2>
      <ul className="menu-tabbing__category">
        {categories.map((category) => (
          <li key={category.id} className="menu-tabbing__item">
            <a
              className={`menu-tabbing__link btn btn--small ${category.id === activeCategory ? 'menu-tabbing__link--active' : ''}`}
              onClick={() => handleCategoryClick(category.id)}
            >
              {category.naziv}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}