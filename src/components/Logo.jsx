import logo from "../assets/logo.svg";
import logoWithTitle from "../assets/logo-with-title.svg";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

export default function Logo({ type }) {
  const logoSrc = type === "with-title" ? logoWithTitle : logo;
  const logoClassName = type === "with-title" ? "with-title" : "";

  return (
    <Link to="/" className="flex">
      <img
        className={`header__logo ${logoClassName}`}
        src={logoSrc}
        alt="Panda house logo"
      />
    </Link>
  );
}

Logo.propTypes = {
  type: PropTypes.string,
  logoSrc: PropTypes.string,
};