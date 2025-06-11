import { useLocation, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

const TopBar = () => {
  const [usuario, setUsuario] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const [menuAberto, setMenuAberto] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const atualizarUsuario = () => {
      const usuarioStorage = JSON.parse(localStorage.getItem("usuario"));
      if (usuarioStorage) {
        setUsuario(usuarioStorage);
      }
    };

    // Atualiza o estado ao montar o componente
    atualizarUsuario();

    // Adiciona um listener para mudanças no localStorage
    window.addEventListener("storage", atualizarUsuario);

    // Remove o listener ao desmontar o componente
    return () => {
      window.removeEventListener("storage", atualizarUsuario);
    };
  }, []);

  useEffect(() => {
    const handleClickFora = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuAberto(false);
      }
    };
    document.addEventListener("mousedown", handleClickFora);
    return () => {
      document.removeEventListener("mousedown", handleClickFora);
    };
  }, []);

  const handleLogout = () => {
    setMenuAberto(false);
    navigate("/sair"); // Navega para a página de confirmação de logout
  };

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
    "/perfil": "Perfil",
    "/logout": "Sair",
  };

  const titulo = routeNames[location.pathname] || "Home";

  return (
    <div
      className="d-flex justify-content-between align-items-center px-4 py-3 mb-3 position-relative"
      style={{
        backgroundColor: "#FFFFFF",
        borderBottom: "2px solid #8B0000",
        borderRadius: "8px",
        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.15)",
        color: "#1C1C1C",
      }}
    >
      <h4 className="m-0 fw-bold" style={{ color: "#8B0000" }}>
        {titulo}
      </h4>

      <div className="d-flex align-items-center gap-3 position-relative">
        {usuario ? (
          <>
            <span
              className="d-none d-md-inline"
              style={{ color: "#3A3A3A", fontWeight: "500" }}
            >
              Olá,{" "}
              {usuario?.nome
                ? usuario.nome.split(" ")[0]
                : usuario?.username
                ? usuario.username.split(" ")[0]
                : "Usuário"}
              !
            </span>
            <img
              src={`https://ui-avatars.com/api/?name=${usuario.nome}&background=8B0000&color=ffffff`}
              alt={usuario.nome}
              className="rounded-circle border border-2"
              width="42"
              height="42"
              style={{ objectFit: "cover", cursor: "pointer" }}
              onClick={() => setMenuAberto(!menuAberto)}
            />
            {menuAberto && (
              <div
                ref={menuRef}
                className="position-absolute"
                style={{
                  top: "60px",
                  right: "0",
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #8B0000",
                  borderRadius: "12px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
                  zIndex: 1000,
                  minWidth: "200px",
                }}
              >
                <button
                  className="w-100 text-start px-4 py-3"
                  style={{
                    background: "none",
                    border: "none",
                    color: "#1C1C1C",
                    fontWeight: "500",
                    fontSize: "15px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setMenuAberto(false);
                    navigate("/perfil");
                  }}
                >
                  👤 Gerenciar Perfil
                </button>
                <button
                  className="w-100 text-start px-4 py-3"
                  style={{
                    background: "none",
                    border: "none",
                    color: "#C0392B",
                    fontWeight: "500",
                    fontSize: "15px",
                    cursor: "pointer",
                  }}
                  onClick={handleLogout}
                >
                  🚪 Sair
                </button>
              </div>
            )}
          </>
        ) : (
          <a
            href="/loginCadastro"
            className="btn"
            style={{
              border: "2px solid #8B0000",
              color: "#8B0000",
              fontWeight: "600",
              borderRadius: "8px",
              padding: "8px 16px",
              transition: "all 0.3s ease-in-out",
              backgroundColor: "transparent",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#FFFFFF";
              e.target.style.color = "#8B0000";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "transparent";
              e.target.style.color = "#8B0000";
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
