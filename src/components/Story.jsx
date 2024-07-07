import SectionHeading from "./SectionHeading.jsx";
import abt_img_1 from "../assets/abt-img-1.jpg";
import abt_logo from "../assets/abt-logo.png";
import abt_img_2 from "../assets/abt-img-2.jpg";

export default function Story () {
  return (
    <section className="container mx-auto py-150">

      <div className="row">
        <div className="col-xl-8">

          <SectionHeading overline="Naša priča" title="Priča o Panda House-u">
            Restoran Panda je mjesto gdje se susreću tradicija i suvremena kineska kuhinja. Od osnutka, posvećeni smo
            pružanju vrhunske kulinarske izvedbe i nezaboravnog iskustva za naše goste. Naša misija je jednostavna -
            donijeti vam najbolje od kineske kuhinje kroz pažljivo pripremljena jela i gostoljubivu atmosferu.
          </SectionHeading>

          <div className="story | row">
            <div className="col-xl-6">
              <h4>Naša kuhinja</h4>
              <p className="story__text">Naši kuhari majstori su u pripremi autentičnih kineskih jela. Koristimo samo
                najkvalitetnije sastojke
                i
                tradicionalne recepte kako bismo vam donijeli istinske okuse Kine. Bilo da ste ljubitelj hrskavih
                zalogaja
                iz woka, mirisnih juha ili raznolikih dim sum delicija, u našoj ponudi pronaći ćete nešto što će
                zadovoljiti vaše nepce.</p>
            </div>
            <div className="col-xl-6">
              <h4>Naša misija</h4>
              <p className="story__text">Uz istinsku strast prema hrani, brinemo se i o vašem iskustvu u restoranu
                Panda. Naš tim posvećen je
                pružanju vrhunske usluge i stvaranju ugodne atmosfere kako biste se osjećali kao kod kuće. Vaše
                zadovoljstvo naš je najveći prioritet, stoga se trudimo svakodnevno nadmašiti vaša očekivanja.</p>
            </div>
            <div className="col-xl-6 pt-48">
              <img className="story__img" role="img" src={abt_img_1}
                   alt="traditional chinese meal with chicken and pasta"/>
            </div>
            <div className="col-xl-6 pt-48">
              <h4>Posjetite nas</h4>
              <p className="story__text">Posjetite nas i doživite čarobni svijet kineske kuhinje u restoranu Panda. Vaša
                gastronomska avantura
                započinje ovdje!</p>
              <img src={abt_logo} role="presentation" alt="original signature"/>
            </div>
          </div>
        </div>
        <div className="col-xl-4">
          <img className="story__img" role="img" src={abt_img_2} alt="close up image of tie pan with vegetables"/>
        </div>
      </div>
    </section>
  )
}