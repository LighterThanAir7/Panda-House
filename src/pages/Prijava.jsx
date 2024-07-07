import {Link} from "react-router-dom";
import Logo from "../components/Logo.jsx";
import LoginForm from "../components/LoginForm.jsx";
import bambus_1 from "../assets/bambus-1.svg";
import {Helmet} from "react-helmet";

export default function Prijava () {
  return (
    <>
      <Helmet>
        <title>Prijava</title>
      </Helmet>
      <div className="auth">
        <Link to="/" className="auth__return">
          <i className="auth__return-icon fa-solid fa-arrow-left"></i>
          Naslovna
        </Link>

        <Logo/>
        <LoginForm/>

        <img className="auth__decoration auth__decoration--left" role="presentation" src={bambus_1} alt=""/>
        <img className="auth__decoration auth__decoration--right" role="presentation" src={bambus_1} alt=""/>
      </div>
    </>
  )
}