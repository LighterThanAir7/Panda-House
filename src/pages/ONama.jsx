import Footer from "../components/Footer.jsx";
import Testimonials from "../components/Testimonials.jsx";
import Header from "../components/Header.jsx";
import Strengths from "../components/Strengths.jsx";
import Banner from "../components/Banner.jsx";
import Story from "../components/Story.jsx";
import {Helmet} from "react-helmet";

export default function ONama () {
  return (
    <>
      <Helmet>
        <title>O nama</title>
      </Helmet>
      <Header />
      <Banner title="O nama">
        Susret tradicije i suvremene kineske kuhinje: Priča o Restoranu Panda
      </Banner>
      <Story />
      <Strengths />
      <Testimonials />
      <Footer />
    </>
  )
}