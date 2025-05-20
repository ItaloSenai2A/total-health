import { BrowserRouter, Route, Routes} from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./App.css";
import { useEffect, useState } from "react";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Logo from "./assets/LogotipoTotalHealth-Photoroom.png";
import LogoMobile from "./assets/LogotipoTotalHealth-Mobile.png";
import HeaderMobile from "./components/header/HeaderMobile";
import TopBar from "./components/header/TopBar"; // NOVO

// Páginas
import Sobre from "./pages/Sobre";
import Contato from "./pages/Contato";
import LoginCadastro from "./pages/LoginCadastro"; // Aqui já corrigido o nome
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
import Usuario from "./pages/Usuario";

function App() {
  const [usuario, setUsuario] = useState(
    JSON.parse(localStorage.getItem("usuario")) || null
  );

  useEffect(() => {
    const dadosSalvos = localStorage.getItem("usuario");
    if (dadosSalvos) {
      setUsuario(JSON.parse(dadosSalvos));
    }
  }, []);

  const handleLogin = (dados) => {
    setUsuario(dados);
    localStorage.setItem("usuario", JSON.stringify(dados));
  };

  return (
    <BrowserRouter>
      <HeaderMobile Logo={LogoMobile} />
      <div className="d-flex min-vh-100">
        <Header Logo={Logo} />
        <div className="flex-grow-1">
          <TopBar usuario={usuario} />
          <main className="p-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sobre" element={<Sobre />} />
              <Route path="/contato" element={<Contato />} />
              <Route path="/usuario" element={<LoginCadastro onLogin={handleLogin} />} />
<Route path="/loginCadastro" element={<LoginCadastro onLogin={handleLogin} />} />
              <Route path="/prescricao" element={<Prescricao />} />
              <Route path="/pagamento" element={<Pagamento />} />
              <Route path="/medicoEspecialidades" element={<MedicoEspecialidade />} />
              <Route path="/medico" element={<Medico />} />
              <Route path="/exame" element={<Exame />} />
              <Route path="/especialidade" element={<Especialidade />} />
              <Route path="/consulta" element={<Consulta />} />
              <Route path="/agendamento" element={<Agendamento />} />
              <Route path="/consulta/nova" element={<NovaConsulta />} />
              <Route path="/perfil" element={<Perfil />} />
              <Route path="/sair" element={<Sair />} />
              <Route path="*" element={<NaoEncontrado />} />
            </Routes>
          </main>
        </div>
      </div>
      <Footer />
      <div className="d-flex flex-column min-vh-100">
        <HeaderMobile Logo={LogoMobile} />
        <div className="d-flex flex-grow-1" style={{ backgroundColor: "#ffffff" }}>
          <Header Logo={Logo} />
          <main className="flex-grow-1" style={{ padding: "4rem 2rem", margin: "1rem", borderRadius: "12px", color: "#8b1a2b" }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sobre" element={<Sobre />} />
              <Route path="/contato" element={<Contato />} />
              <Route path="/usuario" element={<Usuario />} />
              <Route path="/prescricao" element={<Prescricao />} />
              <Route path="/pagamento" element={<Pagamento />} />
              <Route path="/medicoEspecialidades" element={<MedicoEspecialidade />} />
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
      </div>
    </BrowserRouter>
  );
}

export default App;
