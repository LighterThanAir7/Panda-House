import Header from "../components/Header.jsx";
import Banner from "../components/Banner.jsx";
import Footer from "../components/Footer.jsx";
import Testimonials from "../components/Testimonials.jsx";
import {Helmet} from "react-helmet";

export default function Recenzije () {
  return (
    <>
      <Helmet>
        <title>Recenzije</title>
      </Helmet>
      <Header />
      <Banner title="Recenzije" description="Ovdje možete pogledati što drugi kažu o nama. Odvojite par minuta za vlastitu recenziju." />

      <Testimonials />

      <Footer />
    </>
  )
}