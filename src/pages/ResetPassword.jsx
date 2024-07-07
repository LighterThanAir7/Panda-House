import {Link} from "react-router-dom";
import Logo from "../components/Logo.jsx";
import bambus_1 from "../assets/bambus-1.svg";
import ResetPasswordForm from "../components/ResetPasswordForm.jsx";

export default function ResetPassword () {
  return (
    <div className="auth">
      <Link to="/profil" className="auth__return">
        <i className="auth__return-icon fa-solid fa-arrow-left"></i>
        Profil
      </Link>

      <Logo/>
      <ResetPasswordForm />

      <img className="auth__decoration auth__decoration--left" role="presentation" src={bambus_1} alt=""/>
      <img className="auth__decoration auth__decoration--right" role="presentation" src={bambus_1} alt=""/>
    </div>
  )
}