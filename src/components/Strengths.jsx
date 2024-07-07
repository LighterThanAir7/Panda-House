import strengths from "../assets/strengths.png";
import SectionHeading from "./SectionHeading.jsx";

export default function Strengths () {
  return (
    <section className="bg-secondary-50 py-150 relative">
      <div className="strenght__img">
        <img src={strengths} role="presentation" alt="Wai tan soup"/>
      </div>
      <div className="container mx-auto">

        <SectionHeading overline="Čime se ponosimo" title="Zašto smo najbolji?"/>

        <div className="row relative">
          <div className="col-xl-3">
            <i className="strenght__icon fa-solid fa-bowl-food"></i>
            <h4>Raznolika ponuda</h4>
            <p>U restoranu Panda nudimo raznolikost jela kako biste pronašli svoje omiljeno kinesko jelo. Bez obzira
              jeste li ljubitelj piletine, govedine, morskih plodova ili vegetarijanskih delicija, kod nas ćete
              pronaći nešto što će vas oduševiti.</p>
          </div>
          <div className="col-xl-3">
            <i className="strenght__icon fa-solid fa-utensils"></i>
            <h4>Svježa hrana</h4>
            <p>Kvalitetna hrana je temelj naše kuhinje. Koristimo najsvježije sastojke kako bismo osigurali vrhunski
              okus i nutritivnu vrijednost u svakom jelu koje poslužujemo. Vaše je samo da se opustite i uživate u
              svježim okusima kineske kuhinje..</p>
          </div>
          <div className="col-xl-3">
            <i className="strenght__icon fa-regular fa-face-smile-beam"></i>
            <h4>Najbolji okusi</h4>
            <p>Naši majstori kuhinje marljivo rade kako bi svako jelo bilo savršeno uravnoteženo i punog okusa.
              Sastojci se pažljivo biraju i kombiniraju kako bismo vam pružili najbolji okus koji će vas očarati
              iznova i iznova.</p>
          </div>
          <div className="col-xl-3">
            <i className="strenght__icon fa-solid fa-location-dot"></i>
            <h4>Savršeni ambijent</h4>
            <p>Uz vrhunsku hranu, u restoranu Panda stvaramo i savršen ambijent kako biste doživjeli potpuni
              gastronomski užitak. Naše ugodno uređenje prostora kombinira tradicionalne kineske elemente s modernim
              dodirima, stvarajući atmosferu koja će vas očarati već pri ulasku.</p>
          </div>
        </div>
      </div>
    </section>
  )
}