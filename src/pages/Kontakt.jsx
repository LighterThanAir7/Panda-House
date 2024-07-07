import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import Banner from "../components/Banner.jsx";
import Map from "../components/Map.jsx";
import KontaktInfo from "../components/KontaktInfo.jsx";

export default function Kontakt () {
  return (
    <>
      <Header />
      <Banner title="Kontaktirajte nas">
        Rezervirajte svoje mjesto u restoranu!
      </Banner>
      <KontaktInfo />
      <Map />
      <Footer/>
    </>
  )
}