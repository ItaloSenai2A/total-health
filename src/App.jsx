import { BrowserRouter, Route, Routes } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./App.css";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Logo from "./assets/LogotipoTotalHealth-Photoroom.png"; // Logo inserida
import CoverImage from "./assets/capadositetotalhealth.png"; // Imagem de capa enviada

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
    <div className="container-fluid p-0">
      <div className="row no-gutters">
        {/* Sidebar na coluna da esquerda */}
        <div
          className="col-md-3 text-white p-4"
          style={{ backgroundColor: "#8B0000", minHeight: "100vh" }}
        >
          <div className="text-center mb-4">
            <img
              src={Logo}
              alt="TotalHealth Logo"
              className="img-fluid"
              style={{ maxWidth: "250px" }}
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
              <a className="nav-link text-white" href="/medicoEspecialidade">
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
        {/* Área da capa (banner) na coluna da direita */}
        <div className="col-md-9 p-0">
          <img
            src={CoverImage}
            alt="Capa TotalHealth"
            style={{
              width: "100%",
              height: "530px",       // Altura da capa definida para 400px
              objectFit: "cover",    // Preenche a área sem distorção, cortando se necessário
              display: "block"
            }}
          />
        </div>
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
          <Route path="/medicoEspecialidades" element={<MedicoEspecialidade />} />
          <Route path="/medico" element={<Medico />} />
          <Route path="/exame" element={<Exame />} />
          <Route path="/especialidade" element={<Especialidade />} />
          <Route path="/consulta" element={<Consulta />} />
          <Route path="/agendamento" element={<Agendamento />} />
          <Route path="/sair" element={<Sair />} />
          <Route path="/consulta/nova" element={<NovaConsulta />} />
          <Route path="*" element={<NaoEncontrado />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
