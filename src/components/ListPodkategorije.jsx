export default function ListPodkategorije ({ subcategories, activeSubcategory, handleSubcategoryClick, handleClearSubcategory }) {
  return (
    <>
      <h3 className="menu-tabbing__subcategory-title">Podkategorije</h3>
      <ul className="menu-tabbing__subcategory">
        {subcategories.map((subcategory) => (
          <li key={subcategory.id} className="menu-tabbing__item">
            <a
              className={`menu-tabbing__link ${subcategory.id === activeSubcategory ? 'menu-tabbing__link--active' : ''} btn btn--small`}
              onClick={() => handleSubcategoryClick(subcategory.id)}
            >
              {subcategory.naziv}
            </a>
          </li>
        ))}
        {activeSubcategory && (
          <li className="menu-tabbing__item">
            <a
              className="menu-tabbing__link-clear btn btn--small btn--outline-secondary btn--clear"
              onClick={handleClearSubcategory}
            >
              <i className="fa-solid fa-filter-circle-xmark mr-8"></i>
              Očisti filter
            </a>
          </li>
        )}
      </ul>
    </>
  );
}