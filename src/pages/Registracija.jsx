import {Link} from "react-router-dom";
import RegistrationForm from "../components/RegistrationForm.jsx";
import Logo from "../components/Logo.jsx";
import bambus_1 from "../assets/bambus-1.svg";
import {Helmet} from "react-helmet";

export default function Registracija () {
  return (
    <>
      <Helmet>
        <title>Registracija</title>
      </Helmet>
      <div className="auth">
        <Link to="/" className="auth__return">
          <i className="auth__return-icon fa-solid fa-arrow-left"></i>
          Naslovna
        </Link>

        <Logo/>
        <RegistrationForm/>

        <img className="auth__decoration auth__decoration--left" role="presentation" src={bambus_1} alt=""/>
        <img className="auth__decoration auth__decoration--right" role="presentation" src={bambus_1} alt=""/>
      </div>
    </>
  )
}