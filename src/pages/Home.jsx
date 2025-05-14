import Medicos from "../assets/capadositetotalhealth.png";

const Home = () => {
  return (
    <div
      className="container"
      style={{
        position: "relative",
        minHeight: "80vh",
        paddingTop: "10px", // ⬆️ subiu mais o conteúdo geral
        paddingBottom: "60px",
      }}
    >
      {/* Imagem maior, visível e posicionada no canto direito */}
      <img
        src={Medicos}
        alt="Equipe médica"
        style={{
          position: "absolute",
          right: "-70px",
          bottom: "-60px", // imagem não está mais colada no rodapé
          height: "430px",
          zIndex: 0,
        }}
      />

      <div
        className="text-start"
        style={{
          position: "relative",
          zIndex: 1,
          marginTop: "0px", // ⬆️ remove o espaçamento superior
        }}
      >
        <h1
          style={{
            fontWeight: "700",
            fontSize: "3.2rem",
            marginBottom: "1.5rem",
            color: "#8b1a2b",
          }}
        >
          Clínica Médica Total Health
        </h1>
        <p
          style={{
            fontSize: "1.5rem",
            marginBottom: "2rem",
            color: "#8b1a2b",
          }}
        >
          Total Health conta com equipamentos de última geração e os melhores profissionais da região.
        </p>
        <div className="d-flex gap-3">
          <button
            className="btn"
            style={{
              borderRadius: "30px",
              fontWeight: "600",
              color: "white",
              backgroundColor: "#8B1C27",
              border: "2px solid #8B1C27",
              fontSize: "1.1rem",
              padding: "10px 20px",
            }}
          >
            📞 Ligar (22) 2737-6450
          </button>
          <button
            className="btn"
            style={{
              borderRadius: "30px",
              fontWeight: "600",
              color: "white",
              backgroundColor: "#8B1C27",
              border: "2px solid #8B1C27",
              fontSize: "1.1rem",
              padding: "10px 20px",
            }}
          >
            💬 Agendar por WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
