import { BrowserRouter, Route, Routes } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./App.css";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Logo from "./assets/LogotipoTotalHealth-Photoroom.png"; // Logo inserida
import LogoMobile from "./assets/LogotipoTotalHealth-Mobile.png";

import Sobre from "./pages/Sobre";
import Contato from "./pages/Contato";
import Usuario from "./pages/Usuario";
import Prescricao from "./pages/Prescricao";
import Pagamento from "./pages/Pagamento";
import MedicoEspecialidade from "./pages/MedicoEspecialidade";
import Medico from "./pages/Medico";
import Exame from "./pages/Exame";
import Especialidade from "./pages/Especialidade";
import Consulta from "./pages/Consulta";
import Agendamento from "./pages/Agendamento";
import Sair from "./pages/Sair";
import NaoEncontrado from "./pages/NaoEncontrado";
import NovaConsulta from "./pages/NovaConsulta";
import Perfil from "./pages/Perfil";
import Home from "./pages/Home";
import HeaderMobile from "./components/header/HeaderMobile";

function App() {
  return (
    <BrowserRouter>
      <HeaderMobile Logo={LogoMobile} />
      <div className="d-flex min-vh-100">
        <Header Logo={Logo} />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/usuario" element={<Usuario />} />
            <Route path="/prescricao" element={<Prescricao />} />
            <Route path="/pagamento" element={<Pagamento />} />
            <Route
              path="/medicoEspecialidades"
              element={<MedicoEspecialidade />}
            />
            <Route path="/medico" element={<Medico />} />
            <Route path="/exame" element={<Exame />} />
            <Route path="/especialidade" element={<Especialidade />} />
            <Route path="/consulta" element={<Consulta />} />
            <Route path="/agendamento" element={<Agendamento />} />
            <Route path="/sair" element={<Sair />} />
            <Route path="*" element={<NaoEncontrado />} />
            <Route path="/consulta/nova" element={<NovaConsulta />} />
            <Route path="/perfil" element={<Perfil />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
