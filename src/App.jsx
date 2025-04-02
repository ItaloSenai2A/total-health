import { BrowserRouter, Route, Routes } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./App.css";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Logo from "./assets/LogotipoTotalHealth-Photoroom.png"; // Logo inserida

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

const Home = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        {/* Barra lateral com fundo vermelho escuro */}
        <div
          className="col-3 text-white vh-100 p-4"
          style={{ backgroundColor: "#8B0000" }}
        >
          <div className="text-center mb-4">
            <img
              src={Logo}
              alt="TotalHealth Logo"
              className="img-fluid"
              style={{ maxWidth: "250px" }}  // Logo maior
            />
          </div>
          <ul className="nav flex-column">
            <li className="nav-item">
              <a className="nav-link text-white" href="/usuario">
                Usuário
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="/prescricao">
                Prescrições
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="/pagamento">
                Pagamentos
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link text-white"
                href="/medicoEspecialidade"
              >
                Médico/Especialidades
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="/medico">
                Médicos
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="/exame">
                Exames
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="/especialidade">
                Especialidades
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="/contato">
                Contato
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="/consulta">
                Consultas
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="/agendamento">
                Agendamentos
              </a>
            </li>
          </ul>
          <div className="mt-4">
            <a className="nav-link text-white" href="/sair">
              Sair
            </a>
            <p className="mt-3">Linha direta de emergência</p>
            <p className="fw-bold">+91 - 999 999 9999</p>
          </div>
        </div>
        {/* Conteúdo principal removido */}
      </div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Header />
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
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
