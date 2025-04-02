import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router";

import Header from "./components/header/Header";
import Sobre from "./pages/Sobre";
import Contato from "./pages/Contato";
import Home from "./pages/Home";
import NaoEncontrado from "./pages/NaoEncontrado";
import Footer from "./components/footer/Footer";
import Agendamento from "./pages/Agendamento";
import Consulta from "./pages/Consulta";
import Especialidade from "./pages/Especialidade";
import Exame from "./pages/Exame";
import MedicoEspecialidade from "./pages/MedicoEspecialidade";
import Pagamento from "./pages/Pagamento";
import Prescricao from "./pages/Prescricao";
import Usuario from "./pages/Usuario";
import Medico from "./pages/Medico";


function App() {
  return (
    <>
      <BrowserRouter>
        <Header />

        <main className="d-flex flex-grow-1 flex-column">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="*" element={<NaoEncontrado />} />
            <Route path="/agendamento" element={<Agendamento />} />
            <Route path="/consulta" element={<Consulta />} />
            <Route path="/especialidade" element={<Especialidade />} />
            <Route path="/exame" element={<Exame />} />
            <Route path="/medico" element={<Medico />} />
            <Route path="/medicoespecialidade" element={<MedicoEspecialidade />} />
            <Route path="/pagamento" element={<Pagamento />} />
            <Route path="/prescricao" element={<Prescricao />} />
            <Route path="/usuario" element={<Usuario />} />

          </Routes>
        </main>

        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;