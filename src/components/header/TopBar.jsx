import { useLocation } from "react-router-dom";

const TopBar = ({ usuario }) => {
  const location = useLocation();

  const routeNames = {
    "/": "Home",
    "/loginCadastro": "Login/Cadastro",
    "/usuario": "Usuário",
    "/prescricao": "Prescrições",
    "/pagamento": "Pagamentos",
    "/medicoEspecialidade": "Médico/Especialidades",
    "/medico": "Médicos",
    "/exame": "Exames",
    "/especialidade": "Especialidades",
    "/contato": "Contato",
    "/consulta": "Consultas",
    "/agendamento": "Agendamentos",
    "/perfil": "Perfil",
    "/sobre": "Sobre"
  };

  const titulo = routeNames[location.pathname] || "Home";

  return (
    <div
      className="d-flex justify-content-between align-items-center px-4 py-3 mb-3"
      style={{
        backgroundColor: "#ffffff",
        borderBottom: "2px solid #8b1a2b",
        borderRadius: "8px",
        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.08)",
      }}
    >
      <h4 className="m-0 fw-bold" style={{ color: "#8b1a2b" }}>
        {titulo}
      </h4>

      <div className="d-flex align-items-center gap-3">
        {usuario ? (
          <>
            <span
              className="d-none d-md-inline"
              style={{ color: "#333", fontWeight: "500" }}
            >
              Olá, {usuario.nome.split(" ")[0]}!
            </span>
            <img
              src={`https://ui-avatars.com/api/?name=${usuario.nome}&background=8b1a2b&color=ffffff`}
              alt={usuario.nome}
              className="rounded-circle border border-2"
              width="42"
              height="42"
              style={{ objectFit: "cover" }}
            />
          </>
        ) : (
          <a
            href="/loginCadastro"
            className="btn"
            style={{
              border: "2px solid #8b1a2b",
              color: "#8b1a2b",
              fontWeight: "600",
              borderRadius: "8px",
              padding: "8px 16px",
              transition: "all 0.3s ease-in-out",
              backgroundColor: "transparent",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#8b1a2b";
              e.target.style.color = "#ffffff";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "transparent";
              e.target.style.color = "#8b1a2b";
            }}
          >
            Cadastrar-se / Login
          </a>
        )}
      </div>
    </div>
  );
};

export default TopBar;
