import { Link } from "react-router";

const HeaderMobile = () => {
  return (
    <nav
      className="d-md-none d-block navbar navbar-dark navbar-expand-lg"
      style={{
        backgroundColor: "#8B0000",
        padding: "0",
        display: "flex",
        flexDirection: "column",
        zIndex: 1030,
      }}
    >
      {/* Topo com logo e botão */}
      <div
        className="container-fluid justify-content-start align-items-center gap-2"
        style={{ height: "70px" }} // Reduzindo o espaçamento entre os elementos
      >
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{ alignSelf: "center", marginTop: "-12px" }} // Ajuste fino para alinhar com a logo
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <Link to={"/"}>
          <img
            className="logoMobile"
            src="/src/assets/logomobile2.png"
            alt="Transfusão+ Logo"
            style={{ marginTop: "-11px", marginLeft: "-8px" }} // Aproximando mais a logo dos risquinhos
          />
        </Link>
      </div>

      {/* Menu colapsável */}
      <div
        className="collapse navbar-collapse w-100"
        id="navbarSupportedContent"
        style={{
          backgroundColor: "#8B0000",
          transition: "height 0.35s ease",
        }}
      >
        <ul className="navbar-nav me-auto mb-2 mb-lg-0 px-3">
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
        <div className="mt-4 px-3">
          <Link className="nav-link text-white" to="/sair">
            Sair
          </Link>
          
        </div>
      </div>
    </nav>
  );
};

export default HeaderMobile;