import { useNavigate } from "react-router-dom";

const Sair = () => {
  const navigate = useNavigate();

  const handleSair = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  const handleCancelar = () => {
    navigate(-1);
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        backgroundColor: "#F2F2F2", // fundo neutro claro
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Roboto, sans-serif",
      }}
    >
      <div
        style={{
          backgroundColor: "#FFFFFF", // fundo do card
          padding: "40px",
          borderRadius: "16px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
          maxWidth: "500px",
          width: "90%",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: "#1C1C1C", marginBottom: "20px" }}>
          Deseja realmente sair?
        </h2>
        <p style={{ color: "#3A3A3A", marginBottom: "30px" }}>
          Ao sair da sua conta, você será desconectado e perderá qualquer informação não salva.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
          <button
            onClick={handleCancelar}
            style={{
              padding: "12px 24px",
              border: "2px solid #8B0000",
              backgroundColor: "#FFF5E1", // bege claro
              color: "#8B0000",
              borderRadius: "30px",
              fontWeight: "500",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#F9E6E6";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#FFF5E1";
            }}
          >
            Cancelar
          </button>

          <button
            onClick={handleSair}
            style={{
              padding: "12px 24px",
              backgroundColor: "#8B0000", // vermelho escuro
              color: "#FFFFFF",
              border: "none",
              borderRadius: "30px",
              fontWeight: "500",
              cursor: "pointer",
              transition: "background 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#A30000";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#8B0000";
            }}
          >
            Sim, sair
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sair;
