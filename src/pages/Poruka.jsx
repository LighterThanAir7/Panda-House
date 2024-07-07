import logo from "../assets/logo.svg";
import {Link, useLocation} from "react-router-dom";
import {Helmet} from "react-helmet";

export default function Poruka() {
  const location = useLocation();
  const { tip, tekst, backUrl = '/' } = location.state;

  const porukaClass = tip === 'pozitivna' ? 'poruka--pozitivna' : 'poruka--negativna';
  const btnClass = porukaClass === 'poruka--pozitivna' ? 'btn--outline-tertiary ' : 'btn--outline-primary';

  return (
    <>
      <Helmet>
        <title>Panda House</title>
      </Helmet>
      <div className="poruka-container">
        <img className="mb-48" src={logo} alt="Panda house logo"/>
        <article className={`poruka ${porukaClass}`}>
          <p className="poruka__text">{tekst}</p>

          {/*TODO: Dinamički izmijeniti, ne vraća svaki puta na naslovnicu !*/}
          <Link to={backUrl} className={`btn ${btnClass}`}>
            Povratak
          </Link>
        </article>
      </div>
    </>
  );
}