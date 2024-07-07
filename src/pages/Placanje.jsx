import {Link} from "react-router-dom";
import Logo from "../components/Logo.jsx";
import bambus_1 from "../assets/bambus-1.svg";
import PlacanjeForm from "../components/PlacanjeForm.jsx";
import {Helmet} from "react-helmet";

export default function Placanje () {
  return (
    <>
      <Helmet>
        <title>Plaćanje</title>
      </Helmet>
      <div className="auth">
        <Link to="/kosarica" className="auth__return">
          <i className="auth__return-icon fa-solid fa-arrow-left"></i>
          Pregled košarice
        </Link>

        <Logo/>
        <PlacanjeForm/>

        <img className="auth__decoration auth__decoration--left" role="presentation" src={bambus_1} alt=""/>
        <img className="auth__decoration auth__decoration--right" role="presentation" src={bambus_1} alt=""/>
      </div>
    </>
  )
}