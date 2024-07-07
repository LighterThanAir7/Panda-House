import {Link} from "react-router-dom";
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import dailyFresh from "../assets/daily-fresh.png";
import Strengths from "../components/Strengths.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import Testimonials from "../components/Testimonials.jsx";
import riza from "../assets/riza.jpg";
import ourStory from "../assets/our-story.png"
import {Helmet} from "react-helmet";

export default function Pocetna () {
  return (
    <>
      <Helmet>
        <title>Panda House</title>
      </Helmet>

      <Header />

      <section className="banner-home container mx-auto">
        <div className="row align-items-center">

          <div className="banner__content col-xl-6">
            <h1 className="banner__title">Otkrijte Autentične Okuse u <span className="clr-secondary-500">Kineskom Restoranu Panda House</span></h1>
            <p className="banner__subtitle | mb-20">Istražite šarenilo okusa kineske kuhinje s nama!</p>
            <Link to="/jelovnik" className="btn btn--big btn--secondary">
              Pogledajte ponudu
            </Link>
          </div>

          <div className="col-xl-6">
            <div className="banner-home-img">
              <div className="slider-round"></div>
            </div>
          </div>

        </div>

      </section>

      <section className="daily-fresh mb-80">
        <div>
          <img src={dailyFresh} alt=""/>
        </div>
        <div className="daily-fresh__content">
          <h3>Svakodnevno Svježe, Uvijek Ukusno</h3>
          <p className="daily-fresh__desc">
            U restoranu Panda, svakodnevno biramo svježe sastojke kako bismo vam pružili vrhunski okus u svakom jelu. Naša posvećenost svježoj hrani jamči da ćete uvijek uživati u neodoljivim okusima kineske kuhinje. Posjetite nas i doživite spoj svježine i ukusa koji će vas oduševiti!
          </p>
        </div>
      </section>

      <section className="bg-secondary-50 py-150">
        <div className="container mx-auto">
          <h2 className="text-center mb-64">Popularna jela</h2>
          <div className="popular-meals">
            <div className="popular-meal">
              <p className="popular-meal__info">Prijana riža s maslacem</p>
              <img src={riza} alt=""/>
            </div>
            <div className="popular-meal">
              <p className="popular-meal__info">Prijana riža s maslacem</p>
              <img src={riza} alt=""/>
            </div>
            <div className="popular-meal">
              <p className="popular-meal__info">Prijana riža s maslacem</p>
              <img src={riza} alt=""/>
            </div>
            <div className="popular-meal">
              <p className="popular-meal__info">Prijana riža s maslacem</p>
              <img src={riza} alt=""/>
            </div>
            <div className="popular-meal">
              <p className="popular-meal__info">Prijana riža s maslacem</p>
              <img src={riza} alt=""/>
            </div>
            <div className="popular-meal">
              <p className="popular-meal__info">Prijana riža s maslacem</p>
              <img src={riza} alt=""/>
            </div>
            <div className="popular-meal">
              <p className="popular-meal__info">Prijana riža s maslacem</p>
              <img src={riza} alt=""/>
            </div>
            <div className="popular-meal">
              <p className="popular-meal__info">Prijana riža s maslacem</p>
              <img src={riza} alt=""/>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto py-150">
        <div className="row align-items-center">
          <div className="col-xl-6 text-center">
            <img src={ourStory} alt=""/>
          </div>
          <div className="col-xl-6">
            <SectionHeading overline="Majstori kuhinje" title="Vrhunska kvaliteta hrane">
              U kineskom restoranu Panda, posvećeni smo pružanju našim gostima izvanrednog gastronomskog iskustva ispunjenog ukusnom i autentičnom kineskom kuhinjom. Naša priča započela je s strašću za donošenjem bogatih okusa i tradicija kineskog kuhanja našoj lokalnoj zajednici.
            </SectionHeading>
            <Link to="/o-nama" className="btn btn--big btn--secondary">Pročitajte Više</Link>
          </div>
        </div>
      </section>

      <Strengths />
      <Testimonials type="featured" />
      <Footer />
    </>
  )
}