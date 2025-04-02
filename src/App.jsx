import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./App.css";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Logo from "./assets/LogotipoTotalHealth.webp"; // Logo inserida

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
import Perfil from "./pages/Perfil";
import Sair from "./pages/Sair";
import NaoEncontrado from "./pages/NaoEncontrado";

const Home = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        {/* Barra lateral */}
        <div className="col-3 bg-dark text-white vh-100 p-4">
          <div className="text-center mb-4">
            <img src={Logo} alt="TotalHealth Logo" className="img-fluid" style={{ maxWidth: "150px" }} />
          </div>
          <ul className="nav flex-column">
            <li className="nav-item"><a className="nav-link text-white" href="/usuario">Usuário</a></li>
            <li className="nav-item"><a className="nav-link text-white" href="/prescricao">Prescrições</a></li>
            <li className="nav-item"><a className="nav-link text-white" href="/pagamento">Pagamentos</a></li>
            <li className="nav-item"><a className="nav-link text-white" href="/medicoEspecialidade">Médico/Especialidades</a></li>
            <li className="nav-item"><a className="nav-link text-white" href="/medico">Médicos</a></li>
            <li className="nav-item"><a className="nav-link text-white" href="/exame">Exames</a></li>
            <li className="nav-item"><a className="nav-link text-white" href="/especialidade">Especialidades</a></li>
            <li className="nav-item"><a className="nav-link text-white" href="/contato">Contato</a></li>
            <li className="nav-item"><a className="nav-link text-white" href="/consulta">Consultas</a></li>
            <li className="nav-item"><a className="nav-link text-white" href="/agendamento">Agendamentos</a></li>
          </ul>
          <div className="mt-4">
            <a className="nav-link text-white" href="/perfil">Perfil</a>
            <a className="nav-link text-white" href="/sair">Sair</a>
            <p className="mt-3">Linha direta de emergência</p>
            <p className="fw-bold">+91 - 999 999 9999</p>
          </div>
        </div>

        {/* Conteúdo principal */}
        <div className="col-9 p-5">
          <h2>Nova Prescrição</h2>
          <form className="mt-4">
            <div className="mb-3">
              <label className="form-label">Consulta</label>
              <input type="text" className="form-control" placeholder="Digite a consulta" />
            </div>
            <div className="mb-3">
              <label className="form-label">Valor</label>
              <input type="text" className="form-control" placeholder="Digite o valor" />
            </div>
            <div className="mb-3">
              <label className="form-label">Descrição</label>
              <input type="text" className="form-control" placeholder="Digite a descrição" />
            </div>
            <button className="btn btn-primary">Criar</button>
          </form>
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
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/sair" element={<Sair />} />
          <Route path="*" element={<NaoEncontrado />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
