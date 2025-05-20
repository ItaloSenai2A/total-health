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
    "/novoPaciente": "Novo Paciente",
  };

  const titulo = routeNames[location.pathname] || "Home";

  return (
    <div
      className="d-flex justify-content-between align-items-center px-4 py-3 shadow-sm"
      style={{ backgroundColor: "#ffffff" }}
    >
      <h4 className="m-0 fw-bold">{titulo}</h4>
      <div className="d-flex align-items-center gap-2">
        {usuario ? (
          <>
            <span className="text-dark d-none d-md-inline">
              Olá, {usuario.nome.split(" ")[0]}!
            </span>
            <img
              src={`https://ui-avatars.com/api/?name=${usuario.nome}&background=8b0000&color=fff`}
              alt={usuario.nome}
              className="rounded-circle"
              width="40"
              height="40"
            />
          </>
        ) : (
          <a href="/loginCadastro" className="btn btn-outline-primary">
            Cadastrar-se ou Fazer Login
          </a>
        )}
      </div>
    </div>
  );
};

export default TopBar;