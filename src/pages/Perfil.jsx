import { useEffect, useState } from "react";

const Perfil = () => {
  const [usuario, setUsuario] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState({ nome: "", email: "", telefone: "" });

  useEffect(() => {
    const userData = localStorage.getItem("usuario");
    if (userData) {
      const parsed = JSON.parse(userData);
      setUsuario(parsed);
      setEditData(parsed);
    }
  }, []);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const salvarAlteracoes = () => {
    setUsuario(editData);
    localStorage.setItem("usuario", JSON.stringify(editData));
    setShowModal(false);
  };

  if (!usuario) return <div className="text-center mt-5">Usuário não encontrado.</div>;

  return (
    <div
      className="container d-flex flex-column align-items-center justify-content-center"
      style={{ minHeight: "80vh", backgroundColor: "#F2F2F2" }}
    >
      <div
        className="p-5 text-center shadow"
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: "28px",
          width: "100%",
          maxWidth: "500px",
          boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
        }}
      >
        <img
          src={`https://ui-avatars.com/api/?name=${usuario.nome}&background=8B0000&color=ffffff&size=128`}
          alt="Avatar"
          className="mb-3 rounded-circle border"
          style={{ border: "4px solid #8B0000" }}
        />
        <h3 style={{ color: "#1C1C1C" }}>{usuario.nome}</h3>
        <p style={{ color: "#3A3A3A" }}>{usuario.email}</p>
        <p style={{ color: "#3A3A3A" }}>{usuario.telefone}</p>

        <button
          onClick={() => setShowModal(true)}
          className="btn mt-3"
          style={{
            backgroundColor: "#8B0000",
            color: "#FFFFFF",
            fontWeight: "600",
            borderRadius: "12px",
            padding: "10px 24px",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#A30000")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#8B0000")}
        >
          ✏️ Editar Perfil
        </button>
      </div>

      {showModal && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 1050 }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "550px",
              borderRadius: "10px",
              overflow: "hidden",
              boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
              animation: "slideIn .4s ease-out",
            }}
          >
            {/* Topo vermelho escuro */}
            <div style={{ backgroundColor: "#8B0000", padding: "16px" }}>
              <h4 className="m-0 text-white">✏️ Editar Perfil</h4>
            </div>

            {/* Corpo branco do modal */}
            <div className="p-4" style={{ backgroundColor: "#FFFFFF" }}>
              <div className="mb-3">
                <label className="form-label" style={{ color: "#3A3A3A" }}>Nome</label>
                <input
                  name="nome"
                  className="form-control"
                  style={{ backgroundColor: "#F2F2F2", borderColor: "#B0B0B0", color: "#1C1C1C" }}
                  value={editData.nome}
                  onChange={handleEditChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label" style={{ color: "#3A3A3A" }}>E-mail</label>
                <input
                  name="email"
                  className="form-control"
                  style={{ backgroundColor: "#F2F2F2", borderColor: "#B0B0B0", color: "#1C1C1C" }}
                  value={editData.email}
                  onChange={handleEditChange}
                />
              </div>

              <div className="mb-4">
                <label className="form-label" style={{ color: "#3A3A3A" }}>Telefone</label>
                <input
                  name="telefone"
                  className="form-control"
                  style={{ backgroundColor: "#F2F2F2", borderColor: "#B0B0B0", color: "#1C1C1C" }}
                  value={editData.telefone}
                  onChange={handleEditChange}
                />
              </div>
            </div>

            {/* Rodapé vermelho escuro com botões */}
            <div
              className="d-flex justify-content-end gap-2 p-3"
              style={{ backgroundColor: "#8B0000" }}
            >
              <button
                className="btn"
                style={{
                  backgroundColor: "#6C757D",
                  color: "#fff",
                  fontWeight: "600",
                  borderRadius: "8px",
                  padding: "6px 18px",
                }}
                onClick={() => setShowModal(false)}
              >
                Cancelar
              </button>
              <button
                className="btn"
                style={{
                  backgroundColor: "#A30000",
                  color: "#fff",
                  fontWeight: "600",
                  borderRadius: "8px",
                  padding: "6px 18px",
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = "#B80000")}
                onMouseLeave={(e) => (e.target.style.backgroundColor = "#A30000")}
                onClick={salvarAlteracoes}
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideIn {
          0% {
            transform: translateY(-40px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default Perfil;
