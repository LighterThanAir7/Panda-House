import {Link} from "react-router-dom";
import Logo from "../components/Logo.jsx";
import bambus_1 from "../assets/bambus-1.svg";
import OstaviRecenzijuForm from "../components/OstaviRecenzijuForm.jsx";
import {Helmet} from "react-helmet";

export default function OstaviRecenziju () {
  return (
    <>
      <Helmet>
        <title>Ostavi Recenziju</title>
      </Helmet>
      <div className="auth">
        <Link to="/" className="auth__return">
          <i className="auth__return-icon fa-solid fa-arrow-left"></i>
          Recenzije
        </Link>

        <Logo/>
        <OstaviRecenzijuForm/>

        <img className="auth__decoration auth__decoration--left" role="presentation" src={bambus_1} alt=""/>
        <img className="auth__decoration auth__decoration--right" role="presentation" src={bambus_1} alt=""/>
      </div>
    </>
  )
}