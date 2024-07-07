import Logo from "./Logo.jsx";

export default function Footer () {
  return (
    <>
      <footer className="bg-tertiary-100">
        <div className="footer | container mx-auto">
          <div className="footer__group">
            <Logo type="with-title"/>
            <p className="footer__branding">S ponosom vam donosimo autentične kineske specijalitete pripremljene s
              najfinijim sastojcima. Uživajte u našoj bogatoj ponudi jela i iskusite vrhunsku uslugu.</p>
          </div>
          <div className="footer__group">
            <h4 className="footer-section__title">Kontakt</h4>
            <ul className="footer__list">
              <li className="footer__item">
                <i className="fa-solid fa-location-dot"></i>Aleja Javora 14, Zagreb
              </li>
              <li className="footer__item">
                <i className="fa-solid fa-phone"></i>
                <a className="footer__link" href="tel:091/782-5340">Tel: 01 4873 268</a>
              </li>
              <li className="footer__item">
                <i className="fa-solid fa-mobile"></i>
                <a className="footer__link" href="tel:091/782-5340">Mob: 091 798 0253</a>
              </li>
              <li className="footer__item">
                <i className="fa-solid fa-envelope"></i>
                <a className="footer__link" href="mailto:panda-house@info.hr">panda-house@info.hr</a>
              </li>
            </ul>
          </div>
          <div className="footer__group">
            <h4 className="footer__group__title">Radno vrijeme</h4>
            <ul className="footer__list">
              <li className="footer__item">Uto - Ned: <span className="font-semibold">10 - 22h</span></li>
              <li>Ponedjeljkom i blagdanima ne radimo</li>
            </ul>
          </div>
        </div>
      </footer>
      <footer className="bg-tertiary-50 | py-16 text-center">
        <p className="footer__copyright">
          © 2024 Restoran Panda House. All Rights Reserved by <span className="clr-neutral-900">LighterThanAir</span>
        </p>
      </footer>
    </>
  )
}