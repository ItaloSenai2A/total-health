import { Link } from "react-router";

const HeaderMobile = (props) => {
  return (
    <>
      <nav
        className="d-md-none d-block navbar navbar-dark navbar-expand-lg"
        style={{ backgroundColor: "#8B0000" }}
      >
        <div className="container-fluid justify-content-start gap-3">
          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon "></span>
          </button>
          <Link to={"/"}>
            <img
              className="logoMobile"
              src={props.Logo}
              alt=""
              height={"40px"}
            />
          </Link>
          <div
            className="collapse navbar-collapse text-dark"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
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
              <li className="nav-item">
                <a className="nav-link text-white" href="/sobre">
                  Sobre
                </a>
              </li>
            </ul>
            <div className="mt-4 ">
              <Link className="nav-link text-white" to="/sair">
                Sair
              </Link>
              <hr className="w-100 bg-white text-white" />
              <p className="mt-3 text-white">Linha direta de emergência</p>
              <p className="fw-bold text-white">+91 - 999 999 9999</p>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default HeaderMobile;
