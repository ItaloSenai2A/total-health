import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./App.css";
import { useEffect, useState } from "react";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Logo from "./assets/LogotipoTotalHealth-Photoroom.png";
import LogoMobile from "./assets/LogotipoTotalHealth-Mobile.png";
import HeaderMobile from "./components/header/HeaderMobile";
import TopBar from "./components/header/TopBar";
import RotaPrivada from "./components/RotaPrivada";

// Páginas
import Sobre from "./pages/Sobre";
import Contato from "./pages/Contato";
import LoginCadastro from "./pages/LoginCadastro";
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
import Perfil from "./pages/Perfil";
import Home from "./pages/Home";
import Usuario from "./pages/Usuario";
import UsuarioLogin from "./pages/UsuarioLogin";

import ChatBot from "./chatbot/ChatBot";

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
              <Route
                path="/loginCadastro"
                element={<LoginCadastro onLogin={handleLogin} />}
              />

              <Route
                path="/usuarioLogin"
                element={<UsuarioLogin onLogin={handleLogin} />}
              />

              <Route
                path="/"
                element={
                  <RotaPrivada usuario={usuario}>
                    <Home />
                  </RotaPrivada>
                }
              />
              <Route
                path="/sobre"
                element={
                  <RotaPrivada usuario={usuario}>
                    <Sobre />
                  </RotaPrivada>
                }
              />
              <Route
                path="/contato"
                element={
                  <RotaPrivada usuario={usuario}>
                    <Contato />
                  </RotaPrivada>
                }
              />
              <Route
                path="/usuario"
                element={
                  <RotaPrivada usuario={usuario}>
                    <Usuario />
                  </RotaPrivada>
                }
              />
              <Route
                path="/prescricao"
                element={
                  <RotaPrivada usuario={usuario}>
                    <Prescricao />
                  </RotaPrivada>
                }
              />
              <Route
                path="/pagamento"
                element={
                  <RotaPrivada usuario={usuario}>
                    <Pagamento />
                  </RotaPrivada>
                }
              />
              <Route
                path="/medicoEspecialidade"
                element={
                  <RotaPrivada usuario={usuario}>
                    <MedicoEspecialidade />
                  </RotaPrivada>
                }
              />
              <Route
                path="/medico"
                element={
                  <RotaPrivada usuario={usuario}>
                    <Medico />
                  </RotaPrivada>
                }
              />
              <Route
                path="/exame"
                element={
                  <RotaPrivada usuario={usuario}>
                    <Exame />
                  </RotaPrivada>
                }
              />
              <Route
                path="/especialidade"
                element={
                  <RotaPrivada usuario={usuario}>
                    <Especialidade />
                  </RotaPrivada>
                }
              />
              <Route
                path="/consulta"
                element={
                  <RotaPrivada usuario={usuario}>
                    <Consulta />
                  </RotaPrivada>
                }
              />
              <Route
                path="/agendamento"
                element={
                  <RotaPrivada usuario={usuario}>
                    <Agendamento />
                  </RotaPrivada>
                }
              />
              <Route
                path="/perfil"
                element={
                  <RotaPrivada usuario={usuario}>
                    <Perfil />
                  </RotaPrivada>
                }
              />
              <Route
                path="/sair"
                element={
                  <RotaPrivada usuario={usuario}>
                    <Sair />
                  </RotaPrivada>
                }
              />
              <Route path="*" element={<NaoEncontrado />} />
            </Routes>
          </main>
        </div>
      </div>

      {/* Chat fixo em todas as páginas */}
      <ChatBot />

      <Footer />
    </BrowserRouter>
  );
}

export default App;
