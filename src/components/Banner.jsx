import {Link} from "react-router-dom";

export default function Banner ({title, children}) {
  return (
    <section className="bg-secondary-50">
      <div className="banner | container mx-auto">
        <div className="banner__content | w-50">
          <h1 className="banner__title">{title}</h1>
          <p className="banner__subtitle">{children}</p>
        </div>
        <div className="breadcrumb | w-50">
          <ul className="breadcrumb__list">
            <li className="breadcrumb__item">
              <Link to="/" className="breadcrumb__link">
                Početna
              </Link>
            </li>
            <li className="breadcrumb__item breadcrumb__item--current">
              {title}
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}