import { Link } from "react-router-dom";

const Header = (props) => {
  return (
    <div
      className="d-none d-md-flex flex-column col-3 text-white vh-100"
      style={{ backgroundColor: "#8B0000", padding: 0 }}
    >
      {/* Logo grudado no topo, alinhado ao centro com mesmo padding lateral */}
      <div style={{ padding: "16px" }}>
        <Link to="/">
          <img
            src={props.Logo}
            alt="TotalHealth Logo"
            className="img-fluid"
            style={{ maxWidth: "200px", display: "block", margin: "0 auto" }}
          />
        </Link>
      </div>

      {/* Menu com mesmo padding lateral */}
      <ul className="nav flex-column px-4">
        <li className="nav-item">
          <a className="nav-link text-white" href="/usuario">Usuário</a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white" href="/prescricao">Prescrições</a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white" href="/pagamento">Pagamentos</a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white" href="/medicoEspecialidade">Médico/Especialidades</a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white" href="/medico">Médicos</a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white" href="/exame">Exames</a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white" href="/especialidade">Especialidades</a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white" href="/contato">Contato</a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white" href="/consulta">Consultas</a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white" href="/agendamento">Agendamentos</a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white" href="/sobre">Sobre</a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white" href="/sair">Sair</a>
        </li>
      </ul>

    </div>
  );
};

export default Header;
