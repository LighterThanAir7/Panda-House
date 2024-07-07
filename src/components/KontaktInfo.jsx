export default function KontaktInfo () {
  return (
    <section className="kontakt | container mx-auto">
      <div className="kontakt__info">
        <i className="kontakt__icon fa-solid fa-location-dot"></i>
        <div>
          <h3>Lokacija</h3>
          <ul>
            <li className="kontakt__item">Aleja Javora 14, Zagreb</li>
          </ul>
        </div>
      </div>
      <div className="kontakt__info">
        <i className="kontakt__icon fa-solid fa-phone-volume"></i>
        <div>
          <h3>Kontaktirajte nas</h3>
          <ul>
            <li className="kontakt__item">Tel: 01 4873 268</li>
            <li className="kontakt__item">Mob: 091 798 0253</li>
            <li className="kontakt__item">panda-house@info.hr</li>
          </ul>
        </div>
      </div>
      <div className="kontakt__info">
        <i className="kontakt__icon fa-solid fa-calendar-check"></i>
        <div>
          <h3>Radno vrijeme</h3>
          <ul>
            <li className="kontakt__item">Uto - Ned: <span className="font-semibold">10 - 22h</span></li>
          </ul>
        </div>
      </div>
    </section>
  )
}