import {useContext} from "react";
import {UserContext, UserProvider} from "./context/UserContext.jsx";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Pocetna from "./pages/Pocetna.jsx";
import Jelovnik from "./pages/Jelovnik.jsx";
import ONama from "./pages/ONama.jsx";
import Kontakt from "./pages/Kontakt.jsx";
import Profil from "./pages/Profil.jsx";
import Prijava from "./pages/Prijava.jsx";
import Registracija from "./pages/Registracija.jsx";
import Poruka from "./pages/Poruka.jsx";
import AppLoader from "./components/AppLoader.jsx";
import ScrollToTop from './components/ScrollToTop';
import ResetPassword from "./pages/ResetPassword.jsx";
import {CartProvider} from "./context/CartContext.jsx";
import Kosarica from "./pages/Kosarica.jsx";
import Placanje from "./pages/Placanje.jsx";
import {TestimonialProvider} from "./context/TestimonialContext.jsx";
import Recenzije from "./pages/Recenzije.jsx";
import OstaviRecenziju from "./pages/OstaviRecenziju.jsx";

function App() {
  return (
    <UserProvider>
      <CartProvider>
        <TestimonialProvider>
          <AppContent />
        </TestimonialProvider>
      </CartProvider>
    </UserProvider>
  );
}

function AppContent() {
  const { loading } = useContext(UserContext);

  if (loading) {
    return <AppLoader />;
  }

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Pocetna />} />
        <Route path="/jelovnik" element={<Jelovnik />} />
        <Route path="/o-nama" element={<ONama />} />
        <Route path="/kontakt" element={<Kontakt />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/recenzije" element={<Recenzije />} />
        <Route path="/ostavi-recenziju" element={<OstaviRecenziju />} />
        <Route path="/prijava" element={<Prijava />} />
        <Route path="/registracija" element={<Registracija />} />
        <Route path="/kosarica" element={<Kosarica />} />
        <Route path="/placanje" element={<Placanje />} />
        <Route path="/poruka" element={<Poruka />} />
        <Route path="/promijeni-lozinku" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
